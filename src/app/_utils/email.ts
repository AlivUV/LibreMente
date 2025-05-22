import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from "@getbrevo/brevo";

const apiInstance = new TransactionalEmailsApi();

apiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY!
);

export async function sendEmail(
  addressee: string,
  subject: string,
  message: string
) {
  try {
    const sendSmtpEmail = new SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.textContent = message;
    sendSmtpEmail.to = [
      {
        email: addressee,
      },
    ];
    sendSmtpEmail.sender = {
      name: "LibreMente",
      email: "libremente.notify.noreply@gmail.com",
    };

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    return result.response.statusCode;
  } catch (error) {
    console.error(error);
  }
}
