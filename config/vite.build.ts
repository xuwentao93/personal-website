import path from 'path';

const buildConfig = {
  output: {
    path: path.join(__dirname, '../dist'),
    // eslint-disable-next-line no-constant-condition
    // filename: './[name]/index.js',
    filename: './index.js',
    library: 'wtComponent',
    libraryTarget: 'umd', // 支持 import, require, script 标签等方式引入.
    libraryExport: 'default' // 不设置要 xxx.default 的方式引入.
  }
};

export default buildConfig;
