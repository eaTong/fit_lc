import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const envTestPath = path.join(process.cwd(), '.env.test');
if (fs.existsSync(envTestPath)) {
  const envContent = fs.readFileSync(envTestPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0 && !line.startsWith('#')) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

const target = new PrismaClient();

async function check() {
  try {
    const count = await target.$queryRaw`SELECT COUNT(*) as cnt FROM \`muscles\``;
    console.log('Count muscles:', JSON.stringify(count));
  } catch (e: any) {
    console.error('Error:', e.message);
  }

  try {
    const muscles = await target.muscle.findMany({ take: 3 });
    console.log('Found muscles via ORM:', muscles.length);
  } catch (e: any) {
    console.error('ORM Error:', e.message);
  }

  await target.$disconnect();
}

check();