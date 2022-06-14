import nodemailer from "nodemailer";
import {getEnvVar} from "./envUtils";
import Mail from "nodemailer/lib/mailer";

export const sendMail = (mailOptions: Mail.Options) => {
  const transporter = nodemailer.createTransport({
    host: getEnvVar("MAIL_HOST"),
    port: getEnvVar("MAIL_PORT"),
    secure: true, // true for 465, false for other ports
    auth: {
      user: getEnvVar("MAIL_AUTH_USER"),
      pass: getEnvVar("MAIL_AUTH_PASSWORD"),
    },
  });

  return transporter.sendMail({
    from: getEnvVar("MAIL_FROM"),
    ...mailOptions,
  });
}

