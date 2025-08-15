import type { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";

type Resp = { ok: boolean; error?: string };

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 min
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextApiRequest) {
  const xf = (req.headers["x-forwarded-for"] as string) || "";
  const ip = xf.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  return ip;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Resp>) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const secret = process.env.ADMIN_LOGIN;
  if (!secret) return res.status(500).json({ ok: false, error: "ADMIN_LOGIN not set" });

  const ip = getClientIp(req);
  const now = Date.now();
  const entry = attempts.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }
  if (entry.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    const wait = Math.ceil((entry.resetAt - now) / 1000);
    return res.status(429).json({ ok: false, error: `Too many attempts. Try again in ${wait}s.` });
  }

  const { password } = (req.body || {}) as { password?: string };
  if (!password || password !== secret) {
    entry.count += 1;
    attempts.set(ip, entry);
    return res.status(401).json({ ok: false, error: "Invalid password" });
  }

  // success: set cookie
  const cookieStr = cookie.serialize("erp21_admin", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  });

  res.setHeader("Set-Cookie", cookieStr);
  return res.status(200).json({ ok: true });
}
