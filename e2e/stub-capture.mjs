/**
 * Stub of Sellinger's POST /api/landing-leads/capture, for the e2e run only.
 *
 * The real endpoint writes into a live CRM, so the tests must never touch it.
 * This stub speaks the same contract (Bearer site token in, `{ok:true,lead_id}`
 * out) and records what it received, so a test can assert that the lead really
 * carried name/phone/email/населено място/UTM. `POST /__mode {"fail":true}`
 * flips it to a 502 so the failure path can be exercised for real — no
 * client-side request interception, the browser talks to /api/lead as always.
 */
import { createServer } from "node:http";

const PORT = Number(process.env.STUB_CAPTURE_PORT || 4599);
const TOKEN = process.env.STUB_CAPTURE_TOKEN || "e2e-site-token";

/** @type {unknown[]} */
let received = [];
let failing = false;

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://127.0.0.1:${PORT}`);

  if (url.pathname === "/__health") {
    return json(res, 200, { ok: true });
  }

  if (url.pathname === "/__received") {
    if (req.method === "DELETE") {
      received = [];
      return json(res, 200, { ok: true });
    }
    return json(res, 200, { ok: true, received });
  }

  if (url.pathname === "/__mode" && req.method === "POST") {
    const body = await readJson(req);
    failing = Boolean(body.fail);
    return json(res, 200, { ok: true, failing });
  }

  if (url.pathname === "/capture" && req.method === "POST") {
    const auth = req.headers.authorization || "";
    if (auth !== `Bearer ${TOKEN}`) {
      return json(res, 401, { ok: false, error: "Invalid or missing site token" });
    }
    const body = await readJson(req);
    if (failing) {
      // What a real outage looks like to /api/lead: upstream 502, no lead row.
      return json(res, 502, { ok: false, error: "Capture unavailable" });
    }
    received.push(body);
    return json(res, 200, { ok: true, lead_id: `stub-${received.length}`, deduped: false });
  }

  json(res, 404, { ok: false, error: "Not found" });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[stub-capture] listening on http://127.0.0.1:${PORT}`);
});
