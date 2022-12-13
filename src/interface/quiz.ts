type DifficultyType = 'easy' | 'medium' | 'hard';

export interface QuizInterface {
  category: string;
  correct_answer: string;
  difficulty: DifficultyType;
  incorrect_answers: string[];
  question: string;
  type: string;
  selected?: number;
  list: [];
}
