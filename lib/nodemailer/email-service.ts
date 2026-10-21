import { transporter } from "./transporter";

export const sendEmail = async (
  email: string,
  subject: string,
  template: string,
  text?: string,
) => {
  try {
    const message = {
      from: `"Q-Menu" <${process.env.NODE_MAILER_USER}>`,
      to: email,
      subject: subject,
      replyTo: process.env.NODE_MAILER_USER,
      text: text || "",
      html: template,
    };

    const info = await transporter.sendMail(message);
    return { success: true, message: info.messageId };
  } catch (e) {
    console.error("error while sending mail :", e);
    return { success: false, error: e };
  }
};
