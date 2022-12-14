import { useEffect, useState } from 'react';
import useInterval from '@/hooks/useInterval';
import useCommon from '@/hooks/useCommon';
import { getQuiz } from '@/services/quiz';
import {
  QUIZ_COUNT,
  INCORRECT_NOTE_KEY,
  DEFAULT_FEEDBACK_MESSAGE,
  EFFECT_COLOR,
} from '@/constants';
import { ActionTypes } from '@/store/types';

function useQuiz() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>(DEFAULT_FEEDBACK_MESSAGE);
  const [isShowNextQuiz, setIsShowNextQuiz] = useState<boolean>(false);
  const [isShowQuizEnd, setIsShowQuizEnd] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [effectColor, setEffectColor] = useState<string>(EFFECT_COLOR.DEFAULT);
  const [time, setTime] = useState<number>(0);

  const { renderHTML, state, dispatch, navigate } = useCommon();

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

  return {
    handleClickWriteIncorrectNote,
    handleClickNextQuiz,
    handleClickAnswer,
    effectColor,
    feedback,
    isLoading,
    currentQuizNumber,
    quiz,
    time,
    isShowNextQuiz,
    isShowQuizEnd,
    selectedAnswer,
    renderHTML,
    navigate,
  };
}

export default useQuiz;
