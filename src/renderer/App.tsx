import { Home } from 'pages';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
