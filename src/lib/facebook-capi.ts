import { randomUUID } from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const ACCESS_TOKEN = process.env.FB_CAPI_TOKEN;
const TEST_EVENT_CODE = process.env.FB_TEST_EVENT_CODE;
const API_VERSION = "v21.0";

interface UserData {
  client_ip_address?: string;
  client_user_agent?: string;
  em?: string[];
  ph?: string[];
  fn?: string[];
  ln?: string[];
  ct?: string[];
  st?: string[];
  zp?: string[];
  country?: string[];
  fbc?: string;
  fbp?: string;
}

interface ServerEvent {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url: string;
  action_source: "website";
  user_data: UserData;
  custom_data?: Record<string, unknown>;
}

interface SendEventOptions {
  eventName: string;
  sourceUrl: string;
  userData?: Partial<UserData>;
  customData?: Record<string, unknown>;
  eventId?: string;
}

export async function sendServerEvent({
  eventName,
  sourceUrl,
  userData = {},
  customData,
  eventId,
}: SendEventOptions): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return;

  const event: ServerEvent = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId ?? randomUUID(),
    event_source_url: sourceUrl,
    action_source: "website",
    user_data: {
      ...userData,
    },
    ...(customData ? { custom_data: customData } : {}),
  };

  const body: Record<string, unknown> = {
    data: [event],
    access_token: ACCESS_TOKEN,
  };

  if (TEST_EVENT_CODE) {
    body.test_event_code = TEST_EVENT_CODE;
  }

  try {
    await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
  } catch {
    // Silently fail — don't break the user experience for tracking
  }
}
