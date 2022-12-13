import { ActionTypes, QuizTypes } from './types';
import { QuizInterface } from '@/interface/quiz';
import { initialState } from './context';

export default function reducer(
  state: QuizTypes,
  action: {
    type: ActionTypes;
    payload?: any;
  },
) {
  switch (action.type) {
    case ActionTypes.SET_QUIZ:
      return {
        ...state,
        quiz: action.payload.map((quiz: QuizInterface) => {
          return {
            ...quiz,
            list: [quiz.correct_answer, ...quiz.incorrect_answers].sort(
              () => Math.random() - 0.5,
            ),
          };
        }),
      };
    case ActionTypes.SET_RESET_QUIZ:
      return {
        ...initialState,
      };
    case ActionTypes.SET_CURRENT_QUIZ_NUMBER:
      return {
        ...state,
        currentQuizNumber: action.payload,
      };
    case ActionTypes.SET_TIME:
      return {
        ...state,
        time: action.payload,
      };
    case ActionTypes.SET_CORRECT_COUNT:
      return {
        ...state,
        correctCount: action.payload,
      };

    default:
      return state;
  }
}
