import type { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";

export default function handler(_req: NextApiRequest, res: NextApiResponse<{ ok: boolean }>) {
  const cookieStr = cookie.serialize("erp21_admin", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.setHeader("Set-Cookie", cookieStr);
  res.status(200).json({ ok: true });
}
