import Spinner from '@/components/ui/Spinner';
import Button, { BUTTON_SIZE } from '@/components/ui/Button';
import useQuiz from '@/hooks/useQuiz';

export default function QuizPage() {
  const {
    handleClickWriteIncorrectNote,
    handleClickNextQuiz,
    handleClickAnswer,
    effectColor,
    feedback,
    isLoading,
    currentQuizNumber,
    isShowNextQuiz,
    isShowQuizEnd,
    selectedAnswer,
    quiz,
    time,
    renderHTML,
    navigate,
  } = useQuiz();

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
