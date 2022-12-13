import { useEffect, useState } from 'react';

import Spinner from '@/components/ui/Spinner';
import Button, { BUTTON_SIZE } from '@/components/ui/Button';
import useQuiz from '@/hooks/useQuiz';
import useInterval from '@/hooks/useInterval';
import { getQuiz } from '@/services/quiz';
import {
  QUIZ_COUNT,
  INCORRECT_NOTE_KEY,
  DEFAULT_FEEDBACK_MESSAGE,
  EFFECT_COLOR,
} from '@/constants';

import { ActionTypes } from '@/store/types';

export default function QuizPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>(DEFAULT_FEEDBACK_MESSAGE);
  const [isShowNextQuiz, setIsShowNextQuiz] = useState<boolean>(false);
  const [isShowQuizEnd, setIsShowQuizEnd] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [effectColor, setEffectColor] = useState<string>(EFFECT_COLOR.DEFAULT);
  const [time, setTime] = useState<number>(0);

  const { renderHTML, state, dispatch, navigate } = useQuiz();

  const { currentQuizNumber, quiz } = state;

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

  function handleClickAnswer(idx: number) {
    if (isShowNextQuiz || isShowQuizEnd) return;

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
      setSelectedAnswer(idx + 1);
      setFeedback(`😵 땡! ${idx + 1}번은 오답입니다.`);
      setEffectColor(EFFECT_COLOR.INCORRECT);
    }

    if (currentQuizNumber + 1 === QUIZ_COUNT) {
      setIsShowQuizEnd(true);
      dispatch({
        type: ActionTypes.SET_TIME,
        payload: time,
      });
    } else {
      setIsShowNextQuiz(true);
    }
  }

  function handleClickNextQuiz() {
    setSelectedAnswer(null);
    setIsShowNextQuiz(false);
    setFeedback(DEFAULT_FEEDBACK_MESSAGE);
    setEffectColor(EFFECT_COLOR.DEFAULT);
    dispatch({
      type: ActionTypes.SET_CURRENT_QUIZ_NUMBER,
      payload: state.currentQuizNumber + 1,
    });
  }

  function handleClickWriteIncorrectNote() {
    const prevNoteData = localStorage.getItem(INCORRECT_NOTE_KEY) || '[]';

    const noteData = [
      ...JSON.parse(prevNoteData),
      {
        ...quiz[currentQuizNumber],
        selected: selectedAnswer,
      },
    ];

    localStorage.setItem(INCORRECT_NOTE_KEY, JSON.stringify(noteData));
    alert('오답노트에 저장되었습니다.');
    setSelectedAnswer(null);
  }

  useInterval(
    () => {
      setTime(time + 1);
    },
    isShowQuizEnd ? null : 1000,
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
              isShowNextQuiz || isShowQuizEnd
                ? 'cursor-not-allowed'
                : 'cursor-pointer hover:font-bold '
            } inline-flex text-gray-500`}
            onClick={() => handleClickAnswer(idx)}
          >
            {`${idx + 1}.`}
            {renderHTML(item, 'ml-2 text-gray-800')}
          </span>
        ))}
        <p className="text-[20px] font-bold my-5">{feedback}</p>

        <div className="flex gap-3">
          {isShowNextQuiz && (
            <div className="flex">
              <Button
                title="다음 문제"
                size={BUTTON_SIZE.SMALL}
                onClick={handleClickNextQuiz}
              />
            </div>
          )}

          {isShowQuizEnd && (
            <div className="flex">
              <Button
                title="결과 보기"
                size={BUTTON_SIZE.SMALL}
                onClick={() => navigate('/result')}
              />
            </div>
          )}

          {selectedAnswer && (
            <div className="flex">
              <Button
                title="📝 오답 노트 저장"
                size={BUTTON_SIZE.SMALL}
                onClick={handleClickWriteIncorrectNote}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
