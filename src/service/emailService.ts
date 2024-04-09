import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rathna.chh@gmail.com",
    pass: "gvcwmdvhtxypiugf",
  },
});

// const fromEmail = process.env.EMAIL_ADDRESS;

export const sendVerificationEmail = async (
  to: string,
  verificationLink: string
) => {
  try {
    await transporter.sendMail({
      from: "rathna.chh@gmail.com",
      to,
      subject: "Email Verification",
      html: `<p>Please verify your email address by clicking the link below:</p><p><a href="${verificationLink}">${verificationLink}</a></p>`,
    });
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
