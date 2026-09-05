/**
 * Application entry point.
 *
 * Mounts the React root into the `#root` element, wrapping the app in
 * `StrictMode` and `BrowserRouter` for client-side routing. The global
 * stylesheet (`index.css`) is imported here so every component inherits
 * the design tokens, Tailwind utilities, and component-level styles.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
