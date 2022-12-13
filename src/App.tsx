import Routes from '@/pages/routes';
import { QuizProvider } from './store/context';

import Container from '@/components/layout/Container';

function App() {
  return (
    <Container>
      <h1 className="text-[50px] font-bold mb-[20px] text-orange-700">
        😎 Let`s Quiz
      </h1>
      <QuizProvider>
        <Routes />
      </QuizProvider>
    </Container>
  );
}

export default App;
