// import path from 'path';

const buildConfig = {
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: 'index.js',
        assetFileNames: '[name].[ext]'
      }
      // input: {
      //   index: path.join(__dirname, '../src/component')
      // }
    }
  }
};

export default buildConfig;
