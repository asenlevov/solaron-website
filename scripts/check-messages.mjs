#!/usr/bin/env node
/**
 * Fails the build if any messages/*.json contains a duplicate key in the same object.
 *
 * JSON.parse silently keeps the LAST duplicate, so the earlier block becomes dead
 * text that still looks live: editing it changes nothing and the diff looks correct.
 * messages/{bg,en,nl}.json each carried two top-level "Footer" objects for months.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/** Minimal JSON reader that reports duplicate keys instead of collapsing them. */
function findDuplicateKeys(text) {
  const duplicates = [];
  let i = 0;

  const lineOf = (pos) => text.slice(0, pos).split("\n").length;
  const skipWhitespace = () => {
    while (i < text.length && /\s/.test(text[i])) i++;
  };

  function readString() {
    let out = "";
    i++; // opening quote
    while (text[i] !== '"') {
      if (text[i] === "\\") {
        out += text[i] + text[i + 1];
        i += 2;
      } else {
        out += text[i++];
      }
    }
    i++; // closing quote
    return out;
  }

  function readValue(path) {
    skipWhitespace();
    const ch = text[i];
    if (ch === "{") return readObject(path);
    if (ch === "[") return readArray(path);
    if (ch === '"') return readString();
    while (i < text.length && !/[,}\]\s]/.test(text[i])) i++; // number/true/false/null
  }

  function readObject(path) {
    const seen = new Map();
    i++; // {
    skipWhitespace();
    if (text[i] === "}") return void i++;
    for (;;) {
      skipWhitespace();
      const keyPos = i;
      const key = readString();
      const full = path ? `${path}.${key}` : key;
      if (seen.has(key)) {
        duplicates.push({ path: full, firstLine: seen.get(key), dupLine: lineOf(keyPos) });
      } else {
        seen.set(key, lineOf(keyPos));
      }
      skipWhitespace();
      i++; // :
      readValue(full);
      skipWhitespace();
      if (text[i] === ",") { i++; continue; }
      i++; // }
      return;
    }
  }

  function readArray(path) {
    i++; // [
    skipWhitespace();
    if (text[i] === "]") return void i++;
    for (let n = 0; ; n++) {
      readValue(`${path}[${n}]`);
      skipWhitespace();
      if (text[i] === ",") { i++; continue; }
      i++; // ]
      return;
    }
  }

  readValue("");
  return duplicates;
}

const dir = "messages";
let failed = false;

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const path = join(dir, file);
  const text = readFileSync(path, "utf8");
  JSON.parse(text); // syntax first, so a malformed file reports as malformed
  const duplicates = findDuplicateKeys(text);
  for (const d of duplicates) {
    failed = true;
    console.error(
      `${path}:${d.dupLine}  duplicate key "${d.path}" (first defined at line ${d.firstLine}) — ` +
        `JSON.parse keeps the last one, so the earlier block is dead.`
    );
  }
}

if (failed) {
  console.error("\nmessages check failed: remove the shadowed block, keep the one that wins.");
  process.exit(1);
}
console.log("messages check passed: no duplicate keys.");
