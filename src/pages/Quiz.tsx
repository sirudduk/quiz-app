import { useContext } from 'react';
import { QuizContext } from '@/store/context';

export default function QuizPage() {
  const { state } = useContext(QuizContext);

  console.log(state);
  return <div>퀴즈페이지</div>;
}
