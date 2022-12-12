import { useNavigate } from 'react-router-dom';
import Button, { BUTTON_SIZE } from '@/components/ui/Button';

export default function StartPage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/quiz');
  }

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
