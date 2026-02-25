import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const ADMIN_EMAIL = "john.mayer0206@gmail.com";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, message } = await request.json();

    if (!firstName || typeof firstName !== "string") {
      return NextResponse.json({ error: "First name is required" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const fullName = `${firstName.trim()}${lastName ? " " + lastName.trim() : ""}`;

    await transporter.sendMail({
      from: `"Logo.ai Contact Form" <${process.env.SMTP_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: email.trim(),
      subject: `New Contact Form Submission from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E8420D; border-bottom: 2px solid #E8420D; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333; width: 120px;">Name:</td>
              <td style="padding: 10px; color: #555;">${fullName}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 10px; color: #555;">
                <a href="mailto:${email.trim()}" style="color: #E8420D;">${email.trim()}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333; vertical-align: top;">Message:</td>
              <td style="padding: 10px; color: #555; line-height: 1.6;">${message.trim().replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            Sent from Logo.ai Contact Form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
