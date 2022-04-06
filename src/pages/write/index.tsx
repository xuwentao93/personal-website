import * as React from 'react';
import { useState, useRef } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import rehypeRaw from 'rehype-raw';
import 'react-markdown-editor-lite/lib/index.css';
import './index.less';

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function Write() {
  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const view = useRef<HTMLDivElement>(null);

  const methods = {
    write({ text }: any) {
      setValue(text);
    },
    sychronizeScroll(type: 'editor' | 'view') {
      const textarea = document.getElementsByName('textarea')[0];
      // 不做类型断言会被判断为 null.
      const { scrollTop } = (view.current as HTMLDivElement);
      if (type === 'editor') {
        (view.current as HTMLDivElement).scrollTop = textarea.scrollTop;
      } else if (type === 'view') {
        textarea.scrollTop = scrollTop;
      }
    },
    handle() {
      console.log(title);
    }
  };
  return (
    <div className="personal-write-page">
      <div className="navigation">
        <input
          className="title"
          placeholder="请输入标题..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
      </div>
      <div className="markdown-container">
        <MdEditor
          value={value}
          style={{ height: '100%' }}
          renderHTML={text => mdParser.render(text)}
          onChange={methods.write}
          onScroll={() => methods.sychronizeScroll('editor')}
        />

        <div className="markdown-show" onScroll={() => methods.sychronizeScroll('view')} ref={view}>
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
            {value}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
