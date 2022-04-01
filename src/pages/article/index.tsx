/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import rehypeRaw from 'rehype-raw';
import Navigation from '@/components/NewNavigation';
import { dateFormat } from '@/utils';
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
  time: 1331231231232
};

export default function Article() {
  return (
    <div className="personal-article-page">
      <Navigation />
      <div className="article-container">
        <h1>程序员全职接单一个月的感触</h1>
        <div className="msg-container">
          <img
            src="https://img.alicdn.com/imgextra/i3/O1CN01tCQx6r1vGuwZuW4jd_!!6000000006146-2-tps-936-844.png"
            className="avatar"
            alt=""
          />
          <div>
            <div className="name">Xu Wentao</div>
            <div className="brief">
              <span>{dateFormat(test.time)}</span>
              <svg viewBox="0 0 1024 1024" className="eye-icon">
                {/* eslint-disable-next-line max-len */}
                <path d="M512 192c156.448 0 296.021333 98.730667 418.410667 291.605333a52.938667 52.938667 0 0 1 0 56.789334C808.021333 733.269333 668.448 832 512 832c-156.448 0-296.021333-98.730667-418.410667-291.605333a52.938667 52.938667 0 0 1 0-56.789334C215.978667 290.730667 355.552 192 512 192z m0 128c-106.037333 0-192 85.962667-192 192s85.962667 192 192 192 192-85.962667 192-192-85.962667-192-192-192z m0 320c70.688 0 128-57.312 128-128s-57.312-128-128-128-128 57.312-128 128 57.312 128 128 128z" p-id="2795" />
              </svg>
              <span>{test.view}</span>
            </div>
          </div>
        </div>
        {/* <Markdown rehypePlugins={[rehypeRaw]}>{test.content}</Markdown> */}
        <Markdown
          rehypePlugins={[rehypeRaw]}
          components={{
            code({
              node, inline, className, children, ...props
            }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {test.content}
        </Markdown>
      </div>
    </div>
  );
}
