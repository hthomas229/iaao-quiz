import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type Result = {
  name: string;
  score: number;
  completedAt: string;
};

export async function POST(req: Request) {
  const body: Result = await req.json();
  const filePath = path.join(process.cwd(), 'app', 'data', 'results.json');

  let results: Result[] = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    results = JSON.parse(fileData) as Result[];
  }

  results.push(body);
  fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

  return NextResponse.json({ message: 'Saved' });
}
