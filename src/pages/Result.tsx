import React from 'react';
import { Navigate } from 'react-router-dom';

import useCommon from '@/hooks/useCommon';

import Button, { BUTTON_SIZE } from '@/components/ui/Button';
import PieChart from '@/components/ui/PieChart';

export default function ResultPage() {
  const { state, navigate } = useCommon();
  const { quiz, time, correctCount } = state;

  return quiz.length ? (
    <div className="flex gap-8 items-center mb-7">
      <PieChart percent={correctCount * 10} />

      <div className="flex flex-col gap-2">
        <span>π λ©λλ! μ λ΅ κ°μ: {correctCount}κ°</span>
        <span>π΅ λ‘! μ€λ΅ κ°μ: {quiz.length - correctCount}κ°</span>
        <span className="mb-8">β° μμ μκ°: {time}μ΄</span>
        <div className="flex gap-3">
          <Button
            title="π  μ²μμΌλ‘"
            size={BUTTON_SIZE.SMALL}
            onClick={() => {
              navigate('/');
            }}
          />
          <Button
            title="π μ€λ΅λΈνΈ"
            size={BUTTON_SIZE.SMALL}
            onClick={() => {
              navigate('/incorrect-note');
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
