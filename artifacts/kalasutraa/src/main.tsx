import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

// Signal the loading screen to fade out after first paint
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    (window as any).__kalasutraa_ready?.();
  });
});
