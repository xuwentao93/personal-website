import * as React from 'react';
import Markdown from 'react-markdown';
import testMd from '@/utils/test.md?raw';
import './index.less';

interface ArticleType {
  content: string, // 文章内容, markdown 字符串和
  time: number, // 写作时间
  title: string, // 文章标题
  type: 'life' | 'frontend' | 'algorithm' | 'network' | 'other', // 文章类型
  subtype?: string, // 文章子类型
  view: number // 浏览次数
}

// console.log(ReactMarkdown);

const test: ArticleType = {
  content: testMd,
  title: '测试文件',
  type: 'other',
  view: 120,
  time: 1231231231232
};

export default function Article() {
  return (
    <div>
      <Markdown>{testMd}</Markdown>
      1231235
      {/* <div><ReactMarkdown>123123132</ReactMarkdown></div> */}
    </div>
  );
}
