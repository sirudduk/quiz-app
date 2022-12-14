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
        title="π ν΄μ¦ νκΈ°"
        size={BUTTON_SIZE.LARGE}
        onClick={handleClick}
      />
      <Button
        title="π μ€λ΅λΈνΈ"
        size={BUTTON_SIZE.LARGE}
        onClick={() => navigate('/incorrect-note')}
      />
    </div>
  );
}
