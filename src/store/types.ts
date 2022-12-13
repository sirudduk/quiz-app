import { QuizInterface } from '@/interface/quiz';

export enum ActionTypes {
  SET_QUIZ = 'SET_QUIZ',
  SET_CURRENT_QUIZ_NUMBER = 'SET_CURRENT_QUIZ_NUMBER',
  SET_TIME = 'SET_TIME',
  SET_CORRECT_COUNT = 'SET_CORRECT_COUNT',
  SET_RESET_QUIZ = 'SET_RESET_QUIZ',
}

export type QuizTypes = {
  quiz: QuizInterface[];
  currentQuizNumber: number;
  time: number;
  correctCount: number;
};
