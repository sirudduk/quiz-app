import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import Spinner from '@/components/ui/Spinner';
import Button, { BUTTON_SIZE } from '@/components/ui/Button';
import useInterval from '@/hooks/useInterval';
import { getQuiz } from '@/services/quiz';
import { QuizContext } from '@/store/context';
import { ActionTypes } from '@/store/types';

const QUIZ_COUNT = 5;

const DEFAULT_FEEDBACK_MESSAGE = '🚀 정답을 선택해주세요!';
const EFFECT_COLOR = {
  CORRECT: 'bg-green-50',
  INCORRECT: 'bg-red-50',
  DEFAULT: 'bg-gray-50',
};

export default function QuizPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(QuizContext);
  const { currentQuizNumber, quiz } = state;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>(DEFAULT_FEEDBACK_MESSAGE);
  const [isShowNextQuiz, setIsShowNextQuiz] = useState<boolean>(false);
  const [isQuizEnd, setIsQuizEnd] = useState<boolean>(false);
  const [effectColor, setEffectColor] = useState<string>(EFFECT_COLOR.DEFAULT);
  const [time, setTime] = useState<number>(0);

  async function fetchQuiz() {
    setIsLoading(true);
    await getQuiz(QUIZ_COUNT)
      .then((res) => {
        dispatch({
          type: ActionTypes.SET_QUIZ,
          payload: res.results,
        });
        setIsLoading(false);
      })
      .catch(() => {
        console.log('error');
        setIsLoading(false);
      });
  }

  const renderHTML = (text: string, style: string) =>
    React.createElement('span', {
      dangerouslySetInnerHTML: { __html: text },
      className: style,
    });

  function handleClickAnswer(idx: number) {
    if (isShowNextQuiz || isQuizEnd) return;

    if (
      quiz[currentQuizNumber].list[idx] ===
      quiz[currentQuizNumber].correct_answer
    ) {
      dispatch({
        type: ActionTypes.SET_CORRECT_COUNT,
        payload: state.correctCount + 1,
      });
      setFeedback(`😆 딩동댕! ${idx + 1}번은 정답입니다`);
      setEffectColor(EFFECT_COLOR.CORRECT);
    } else {
      setFeedback(`😵 땡! ${idx + 1}번은 오답입니다.`);
      setEffectColor(EFFECT_COLOR.INCORRECT);
    }

    if (currentQuizNumber + 1 === QUIZ_COUNT) {
      setIsQuizEnd(true);
      dispatch({
        type: ActionTypes.SET_TIME,
        payload: time,
      });
    } else {
      setIsShowNextQuiz(true);
    }
  }

  function handleClickNextQuiz() {
    setIsShowNextQuiz(false);
    setFeedback(DEFAULT_FEEDBACK_MESSAGE);
    setEffectColor(EFFECT_COLOR.DEFAULT);
    dispatch({
      type: ActionTypes.SET_CURRENT_QUIZ_NUMBER,
      payload: state.currentQuizNumber + 1,
    });
  }

  useInterval(
    () => {
      setTime(time + 1);
    },
    isQuizEnd ? null : 1000,
  );

  useEffect(() => {
    fetchQuiz();
  }, []);

  return quiz.length && !isLoading ? (
    <div className={`${effectColor} rounded-md p-5 shadow-xl w-[500px]`}>
      <div className="flex justify-between">
        <span className="mb-3 text-orange-500">
          {`${currentQuizNumber + 1} / ${quiz.length}`}
        </span>

        <span>⏰ {time}초</span>
      </div>

      {renderHTML(
        quiz[currentQuizNumber]?.question,
        'mb-3 font-bold inline-block',
      )}

      <div className="flex flex-col">
        {quiz[currentQuizNumber]?.list?.map((item, idx) => (
          <span
            key={idx}
            className={`${
              isShowNextQuiz || isQuizEnd
                ? 'cursor-not-allowed'
                : 'cursor-pointer hover:font-bold '
            } inline-flex font-bold text-gray-500`}
            onClick={() => handleClickAnswer(idx)}
          >
            {`${idx + 1}.`}
            {renderHTML(item, 'ml-2 font-normal text-gray-800')}
          </span>
        ))}
        <p className="text-[20px] font-bold my-5">{feedback}</p>

        {isShowNextQuiz && (
          <div className="flex">
            <Button
              title="다음 문제"
              size={BUTTON_SIZE.SMALL}
              onClick={handleClickNextQuiz}
            />
          </div>
        )}

        {isQuizEnd && (
          <div className="flex">
            <Button
              title="결과 보기"
              size={BUTTON_SIZE.SMALL}
              onClick={() => navigate('/result')}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
