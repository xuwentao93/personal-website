const buildConfig = {
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: 'js/index.js',
        assetFileNames: 'asstes/[name].[ext]'
      }
    }
  }
};

export default buildConfig;
