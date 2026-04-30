import OSS from 'ali-oss';

const client = new OSS({
  region: process.env.OSS_REGION || 'oss-cn-hangzhou',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
  bucket: process.env.OSS_BUCKET || 'fitlc',
});

export async function uploadAvatar(userId: number, file: Buffer, ext: string): Promise<string> {
  const filename = `avatars/user-${userId}-${Date.now()}.${ext}`;
  const result = await client.put(filename, file);
  return result.url;
}

export async function uploadChatImage(userId: number, file: Buffer, ext: string): Promise<string> {
  const filename = `chat-images/user-${userId}-${Date.now()}.${ext}`;
  const result = await client.put(filename, file);
  return result.url;
}