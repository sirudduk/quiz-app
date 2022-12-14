import { createElement, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { QuizContext } from '@/store/context';

export default function useCommon() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(QuizContext);

  const renderHTML = (text: string, style?: string) =>
    createElement('span', {
      dangerouslySetInnerHTML: { __html: text },
      className: style,
    });

  return {
    renderHTML,
    state,
    dispatch,
    navigate,
  };
}
