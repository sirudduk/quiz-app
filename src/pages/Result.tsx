import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import Button, { BUTTON_SIZE } from '@/components/ui/Button';
import PieChart from '@/components/ui/PieChart';

import { QuizContext } from '@/store/context';

export default function ResultPage() {
  const navigate = useNavigate();
  const { state } = useContext(QuizContext);
  const { quiz, time, correctCount } = state;
  return quiz.length ? (
    <div className="flex gap-8 items-center mb-7">
      <PieChart percent={correctCount * 10} />

      <div className="flex flex-col gap-2">
        <span>😆 딩동댕! 정답 개수: {correctCount}개</span>
        <span>😵 땡! 오답 개수: {quiz.length - correctCount}개</span>
        <span className="mb-8">⏰ 소요 시간: {time}초</span>
        <div className="flex gap-3">
          <Button
            title="🏠 처음으로"
            size={BUTTON_SIZE.SMALL}
            onClick={() => {
              navigate('/');
            }}
          />
          <Button
            title="📝 오답노트"
            size={BUTTON_SIZE.SMALL}
            onClick={() => {
              navigate('/');
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
