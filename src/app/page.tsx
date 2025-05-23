// File: app/page.tsx (Home Page)
'use client';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/useQuizStore';

export default function Home() {
  const router = useRouter();
  const { name, date, setName, setDate } = useQuizStore();

  const startQuiz = () => {
    if (name && date) {
      router.push('/quiz');
    } else {
      alert('Please enter your name and date');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Welcome to the Quiz</h1>
      <input className="border p-2 w-full mb-2" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 w-full mb-4" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2" onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}