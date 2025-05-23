// File: app/result/page.tsx
'use client';
import { useEffect } from 'react';
import { useQuizStore } from '@/store/useQuizStore';
import { useRouter } from 'next/navigation';

export default function Result() {
  const { name, date, score } = useQuizStore();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testId: 'test001',
        name,
        date,
        score
      })
    });
  }, [name, date, score]);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Quiz Completed!</h1>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Score:</strong> {score}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2" onClick={() => router.push('/')}>Go Home</button>
    </div>
  );
}
