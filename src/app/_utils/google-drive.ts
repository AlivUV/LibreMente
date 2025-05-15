import { google } from "googleapis";
import stream from "stream";

// A Function that can provide access to google drive api
async function authorize() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.DRIVE_CLIENT_ID,
    process.env.DRIVE_CLIENT_SECRET,
    process.env.DRIVE_REDIRECT_URI,
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.DRIVE_REFRESH_TOKEN,
  });

  return oauth2Client;
}

export async function uploadFile(data: Buffer, name: string) {
  const auth = await authorize();
  const service = google.drive({ version: "v3", auth });
  const requestBody = {
    name: name,
    mimeType: "application/pdf",
  };
  const media = {
    mimeType: "application/pdf",
    body: new stream.PassThrough().end(data),
  };
  try {
    const file = await service.files
      .create({
        requestBody,
        media: media,
      })
      .catch((reason) => console.log(reason));
    if (file) {
      return file.data.id;
    }
    return "";
  } catch (error) {
    throw error;
  }
}

async function setPermissions(id: string) {
  const auth = await authorize();
  const service = google.drive({ version: "v3", auth });

  const response = await service.permissions.create({
    fileId: id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });
}

export async function updatePhoto(fileId: string, data: Buffer) {
  const auth = await authorize();
  const service = google.drive({ version: "v3", auth });
  const media = {
    mimeType: "image/webp",
    body: new stream.PassThrough().end(data),
  };

  try {
    console.log("PRAYING FOR IT TO WORK");
    const file = await service.files.update({
      fileId: fileId,
      media: media,
      fields: "webContentLink",
    });
    console.log(file.data.webContentLink);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function uploadPhoto(data: Buffer, name: string) {
  const auth = await authorize();
  const service = google.drive({ version: "v3", auth });
  const requestBody = {
    name: name,
    mimeType: "image/webp",
  };
  const media = {
    mimeType: "image/webp",
    body: new stream.PassThrough().end(data),
  };
  try {
    const file = await service.files
      .create({
        requestBody,
        media: media,
      })
      .catch((reason) => console.log(reason));
    if (file) {
      setPermissions(file.data.id!);
      return file.data.id;
    }
    return "";
  } catch (error) {
    throw error;
  }
}

export async function getFile(fileId: string) {
  const auth = await authorize();
  const service = google.drive({ version: "v3", auth });
  try {
    const file = await service.files.get({
      fileId: fileId,
      alt: "media",
    });
    const blob: Blob = file.data as unknown as Blob;
    return new Blob([await blob.arrayBuffer()], { type: blob.type });
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}

export async function deleteFile(fileId: string) {
  const auth = await authorize();
  const service = google.drive({ version: "v3", auth });
  const result = await service.files.delete({ fileId }).catch((reason) => {
    console.log(reason);
  });
}

export async function getAllFiles() {
  const auth = await authorize();
  const service = google.drive({ version: "v3", auth });
  const results = (await service.files.list()).data.files;
  return results!.map((file) => file.id as string);
}
