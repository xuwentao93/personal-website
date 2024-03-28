import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './router';
import { BrowserRouter as Router } from 'react-router-dom';
import './global/index.css';

// 加入 React 18 的 concurrent 模式, 使用新的 hook 和并发模式.
const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>
    <App />
  </Router>
);
