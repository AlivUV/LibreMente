import { google } from "googleapis";

// A Function that can provide access to google drive api
async function authorize() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: process.env.GMAIL_ACCESS_TOKEN,
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  return oauth2Client;
}

function generateEncodedEmail(
  addressee: string,
  subject: string,
  message: string
) {
  const mail =
    `From: me\r\n` +
    `To: ${addressee}\r\n` +
    `Subject: ${subject}\r\n\r\n` +
    `${message}`;

  const encodedMessage = btoa(mail)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return encodedMessage;
}

export async function sendEmail(
  addressee: string,
  subject: string,
  message: string
) {
  const auth = await authorize();
  const service = google.gmail({ version: "v1", auth });
  try {
    const mail = await service.users.messages.send({
      userId: "me",
      requestBody: {
        raw: generateEncodedEmail(addressee, subject, message),
      },
    });

    return mail.data.id;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
