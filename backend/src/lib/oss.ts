import OSS from 'ali-oss';

const client = new OSS({
  region: process.env.OSS_REGION || 'oss-cn-hangzhou',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
  bucket: process.env.OSS_BUCKET || 'fitlc',
  secure: true, // Use HTTPS
});

const BUCKET = process.env.OSS_BUCKET || 'fitlc';
const REGION = process.env.OSS_REGION || 'oss-cn-hangzhou';
const OSS_HOST = `https://${BUCKET}.${REGION}.aliyuncs.com`;

export async function uploadAvatar(userId: number, file: Buffer, ext: string): Promise<string> {
  const filename = `avatars/user-${userId}-${Date.now()}.${ext}`;
  await client.put(filename, file);
  return `${OSS_HOST}/${filename}`;
}

export async function uploadChatImage(userId: number, file: Buffer, ext: string): Promise<string> {
  const filename = `chat-images/user-${userId}-${Date.now()}.${ext}`;
  await client.put(filename, file);
  return `${OSS_HOST}/${filename}`;
}

export async function uploadAudio(userId: number, file: Buffer, ext: string): Promise<string> {
  const filename = `voice-messages/user-${userId}-${Date.now()}.${ext}`;
  await client.put(filename, file);
  return `${OSS_HOST}/${filename}`;
}