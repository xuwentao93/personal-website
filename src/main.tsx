import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './router';
import { testApi } from './api';
import { analyzeDOM } from '@/utils/analyze';
import { BrowserRouter as Router } from 'react-router-dom';
import './global/index.css';

// 加入 React 18 的 concurrent 模式, 使用新的 hook 和并发模式.
const root = createRoot(document.getElementById('root') as HTMLElement);

const pushState = history.pushState;
history.pushState = function (...rest) {
  testApi();
  pushState.call(this, ...rest);
}

analyzeDOM(document.getElementById('root') as Node);

root.render(
  <Router>
    <App />
  </Router>
);
