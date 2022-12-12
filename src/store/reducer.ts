import { ActionTypes } from './types';
import { QuizTypes } from './types';

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
        quiz: action.payload,
      };

    default:
      return state;
  }
}
