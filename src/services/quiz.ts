import request from './request';
import { HTTP_METHOD } from './request';

export const getQuiz = (count: number) => {
  return request(`?amount=${count}`, HTTP_METHOD.GET);
};
