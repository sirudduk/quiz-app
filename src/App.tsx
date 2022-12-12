import Routes from '@/routes';
import { QuizProvider } from './store/context';

import Container from '@/components/layout/Container';

function App() {
  return (
    <Container>
      <QuizProvider>
        <Routes />
      </QuizProvider>
    </Container>
  );
}

export default App;
