import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button, { BUTTON_SIZE } from '@/components/ui/Button';
import { QuizContext } from '@/store/context';
import { ActionTypes } from '@/store/types';

export default function StartPage() {
  const navigate = useNavigate();
  const { dispatch } = useContext(QuizContext);

  function handleClick() {
    navigate('/quiz');
  }

  useEffect(() => {
    dispatch({
      type: ActionTypes.SET_RESET_QUIZ,
    });
  }, []);

  return (
    <div>
      <Button
        title="&#128640; 퀴즈 풀기"
        size={BUTTON_SIZE.LARGE}
        onClick={handleClick}
      />
    </div>
  );
}
