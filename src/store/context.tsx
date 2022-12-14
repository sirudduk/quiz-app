import { createContext, ReactNode, useReducer, Dispatch } from 'react';

import { QuizTypes } from './types';
import { ActionTypes } from './types';

import reducer from './reducer';

export const initialState = {
  quiz: [],
  currentQuizNumber: 0,
  time: 0,
  correctCount: 0,
};

const QuizContext = createContext<{
  state: QuizTypes;
  dispatch: Dispatch<{
    type: ActionTypes;
    payload?: any;
  }>;
}>({ state: initialState, dispatch: () => null });

const QuizProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {props.children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };
