import useCommon from '@/hooks/useCommon';
import { QuizInterface } from '@/interface/quiz';
import Button, { BUTTON_SIZE } from '@/components/ui/Button';
import { INCORRECT_NOTE_KEY } from '@/constants';

export default function IncorrectNotePage() {
  const { renderHTML, navigate } = useCommon();

  const note = JSON.parse(localStorage.getItem(INCORRECT_NOTE_KEY) || '[]');

  return (
    <div className="flex flex-col gap-4 w-[500px]">
      <div className="flex items-center justify-between">
        <span className="font-bold text-2xl">📝 오답노트</span>
        <Button
          title="🏠 처음으로"
          size={BUTTON_SIZE.SMALL}
          onClick={() => {
            navigate('/');
          }}
        />
      </div>

      {note.length ? (
        <>
          <div className="flex items-center justify-end">
            <div className="rounded-[100%] w-[20px] h-[20px] bg-blue-600 mr-1" />
            정답
            <div className="rounded-[100%] w-[20px] h-[20px] bg-red-600 ml-3 mr-1" />
            내가 고른 답
          </div>
          <div className="h-[70vh] overflow-y-auto flex flex-col gap-4 p-6">
            {note.map((item: QuizInterface, idx: number) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 shadow-md">
                {renderHTML(item.question, 'font-bold mb-4 inline-block')}

                {item.list.map((li: string, index: number) => (
                  <p
                    key={index}
                    className={`${
                      Number(item.selected) === index + 1 ? 'text-red-500' : ''
                    } ${item.correct_answer === li ? 'text-blue-500' : ''}`}
                  >
                    {`${index + 1}.`}
                    {renderHTML(li, 'ml-1 inline-block')}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-2xl mt-10">
          저장된 오답노트가 없습니다.
        </div>
      )}
    </div>
  );
}
