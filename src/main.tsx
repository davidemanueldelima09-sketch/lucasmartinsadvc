import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@fontsource/dm-serif-display/400.css';
import '@fontsource-variable/figtree/index.css';
import './index.css';
import App from './App';

/** Prévia em artefato (sem servidor de rotas): navegação em memória. */
const Router = import.meta.env.MODE === 'artifact' ? MemoryRouter : BrowserRouter;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
