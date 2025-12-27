import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Performance: Use requestIdleCallback for non-critical rendering
const root = createRoot(document.getElementById('root'));

// Use requestIdleCallback if available, otherwise render immediately
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(() => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }, 1);
}
