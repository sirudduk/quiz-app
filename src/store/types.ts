import { QuizInterface } from '@/interface/quiz';

export enum ActionTypes {
  SET_QUIZ = 'SET_QUIZ',
}

export type QuizTypes = {
  quiz: QuizInterface[];
};
