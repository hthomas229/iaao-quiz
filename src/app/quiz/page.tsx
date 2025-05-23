'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useQuizStore } from '@/store/useQuizStore';
import { questions } from '../data/questions';
import { useState } from 'react';

export default function Quiz() {
  const router = useRouter();
  const { answers, setAnswer, setScore } = useQuizStore();
  const [current, setCurrent] = useState(0);

  const currentQuestion = questions[current];

  const next = () => {
    if (!answers[currentQuestion.id]) {
      alert('Please select an answer');
      return;
    }
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      let score = 0;
      questions.forEach(q => {
        if (answers[q.id] === q.answer) score++;
      });
      setScore(score);
      router.push('/result');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl mb-2">{current + 1}. {currentQuestion.question}</h2>
      {currentQuestion.image && (
        <div className="mb-4 relative w-full h-60">
          <Image 
            src={currentQuestion.image} 
            alt={`Illustration for question ${current + 1}`} 
            fill
            className="object-contain border rounded shadow"
            priority
          />
        </div>
      )}
      <div className="space-y-2">
        {currentQuestion.options.map((opt) => (
          <div key={opt}>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={currentQuestion.id}
                value={opt}
                checked={answers[currentQuestion.id] === opt}
                onChange={() => setAnswer(currentQuestion.id, opt)}
              />
              <span className="ml-2">{opt}</span>
            </label>
          </div>
        ))}
      </div>
      <button className="mt-4 bg-green-600 text-white px-4 py-2" onClick={next}>
        {current === questions.length - 1 ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}