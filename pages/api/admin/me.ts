import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<{ authenticated: boolean }>) {
  const raw = req.headers.cookie || "";
  const authed = raw
    .split(";")
    .map((c) => c.trim())
    .some((c) => c === "erp21_admin=1");
  res.status(200).json({ authenticated: authed });
}
