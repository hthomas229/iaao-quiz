// File: app/api/save/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const body = await req.json();
  const filePath = path.join(process.cwd(), 'app', 'data', 'results.json');

  let results: any[] = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    results = JSON.parse(fileData);
  }

  results.push(body);
  fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

  return NextResponse.json({ message: 'Saved' });
}
