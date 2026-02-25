import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const ADMIN_EMAIL = "john.mayer0206@gmail.com";

export async function POST(request: Request) {
  try {
    const { email, interest, portfolio, why } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!interest || typeof interest !== "string") {
      return NextResponse.json({ error: "Area of interest is required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Logo.ai Careers" <${process.env.SMTP_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: email.trim(),
      subject: `New Career Interest: ${interest} — ${email.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E8420D; border-bottom: 2px solid #E8420D; padding-bottom: 10px;">
            New Career Interest Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333; width: 150px;">Email:</td>
              <td style="padding: 10px; color: #555;">
                <a href="mailto:${email.trim()}" style="color: #E8420D;">${email.trim()}</a>
              </td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #333;">Area of Interest:</td>
              <td style="padding: 10px; color: #555;">${interest}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333;">LinkedIn / Portfolio:</td>
              <td style="padding: 10px; color: #555;">${portfolio ? `<a href="${portfolio}" style="color: #E8420D;">${portfolio}</a>` : "Not provided"}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #333; vertical-align: top;">Why Logo.ai:</td>
              <td style="padding: 10px; color: #555; line-height: 1.6;">${why ? why.trim().replace(/\n/g, "<br>") : "Not provided"}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            Sent from Logo.ai Careers Form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Careers form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
