import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StartPage from './pages/Start';
import QuizPage from './pages/Quiz';
import Container from '@/components/layout/Container';

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
