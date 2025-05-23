import { create } from 'zustand';

type State = {
  name: string;
  date: string;
  answers: Record<string, string>;
  score: number;
  setName: (name: string) => void;
  setDate: (date: string) => void;
  setAnswer: (id: string, value: string) => void;
  setScore: (score: number) => void;
};

export const useQuizStore = create<State>((set) => ({
  name: '',
  date: '',
  answers: {},
  score: 0,
  setName: (name) => set({ name }),
  setDate: (date) => set({ date }),
  setAnswer: (id, value) => set((state) => ({ answers: { ...state.answers, [id]: value } })),
  setScore: (score) => set({ score }),
}));
