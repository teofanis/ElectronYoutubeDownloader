import { Home } from 'pages';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './global.css';

interface AppProps {
  ipc: Window['electron']['ipc'];
}

export default function App({ ipc }: AppProps) {
  return (
    <AppProvider ipc={ipc}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
