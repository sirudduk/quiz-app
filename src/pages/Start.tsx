import { useEffect } from 'react';

import Button, { BUTTON_SIZE } from '@/components/ui/Button';
import { ActionTypes } from '@/store/types';
import useCommon from '@/hooks/useCommon';

export default function StartPage() {
  const { dispatch, navigate } = useCommon();
  function handleClick() {
    navigate('/quiz');
  }

  useEffect(() => {
    dispatch({
      type: ActionTypes.SET_RESET_QUIZ,
    });
  }, []);

  return (
    <div className="flex gap-3 py-5">
      <Button
        title="🚀 퀴즈 풀기"
        size={BUTTON_SIZE.LARGE}
        onClick={handleClick}
      />
      <Button
        title="📝 오답노트"
        size={BUTTON_SIZE.LARGE}
        onClick={() => navigate('/incorrect-note')}
      />
    </div>
  );
}
