import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const buildTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("Missing SMTP configuration");
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });
};

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim();

    if (!email) {
      return NextResponse.json({ success: false, error: "Missing email" }, { status: 400 });
    }

    const transporter = buildTransporter();
    const to = process.env.MAIL_TO || "info@craivings.com";
    const from = process.env.MAIL_FROM || "Craivings Website <marketing@barhoumholdings.com>";

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: "New Newsletter Subscription",
      text: `Email: ${email}`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe email error:", error);
    return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 });
  }
}
