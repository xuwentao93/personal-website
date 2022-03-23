import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import buildConifg from './vite.build';
import devConfig from './vite.dev';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const commonConfig = {
    plugins: [react()]
  };

  if (command === 'serve') {
    return {
      ...commonConfig,
      ...devConfig
    };
  }
  return {
    ...commonConfig,
    ...buildConifg
  };
});
