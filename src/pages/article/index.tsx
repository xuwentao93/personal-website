import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import rehypeRaw from 'rehype-raw';
import Navigation from '@/components/NewNavigation';
import Signature from '@/components/Signature';
import { dateFormat } from '@/utils';
import { getArticle, viewArticle, deleteArticle } from '@/api';
import { ArticleType } from '@/constant/enum';
import './index.less';
import message from '@/components/Message';

interface ArticleMsgType {
  // 文章内容, markdown 字符串和
  content: string,
  // 写作时间
  time: number,
  // 文章标题
  title: string,
  // 文章类型
  type: ArticleType.life | ArticleType.frontend | ArticleType.algorithm | ArticleType.network | ArticleType.other
  // 文章子类型
  subtype?: string,
  // 浏览次数
  view: number
}

export default function Article() {
  const { id } = (useParams() as any);
  const code = localStorage.getItem('code');

  const [article, setArticle] = useState<ArticleMsgType>(({} as ArticleMsgType));

  const methods = {
    getArticle() {
      getArticle({ id }).then((res: any) => {
        if (res.success) {
          setArticle(res.data);
        }
      });
    },
    viewArticle() {
      viewArticle({ id });
    },
    modify() {
      window.open(`/write?id=${id}`);
    },
    delete() {
      const code = localStorage.getItem('code');
      deleteArticle({
        code,
        id
      }).then((res: any) => {
        if (res.success) {
          message.success('删除成功!');
        } else {
          message.error(res.message || '删除失败');
        }
      });
    }
  };

  useEffect(() => {
    methods.getArticle();
    methods.viewArticle();
  }, []);

  return (
    <div className="personal-article-page">
      <Navigation />
      <div className="article-container">
        <h1 className="title">
          <div className="flex1">{article.title}</div>
          {code && (
            <>
              <div className="button button-primary" onClick={methods.modify}>修改</div>
              <div className="button button-error" onClick={methods.delete}>删除</div>
            </>
          )}
        </h1>
        <div className="msg-container">
          <img
            src="https://img.alicdn.com/imgextra/i3/O1CN01tCQx6r1vGuwZuW4jd_!!6000000006146-2-tps-936-844.png"
            className="avatar"
            alt=""
          />
          <div>
            <div className="name">Xu Wentao</div>
            <div className="brief">
              <span>{dateFormat(article.time)}</span>
              <svg viewBox="0 0 1024 1024" className="eye-icon">
                {/* eslint-disable-next-line max-len */}
                <path d="M512 192c156.448 0 296.021333 98.730667 418.410667 291.605333a52.938667 52.938667 0 0 1 0 56.789334C808.021333 733.269333 668.448 832 512 832c-156.448 0-296.021333-98.730667-418.410667-291.605333a52.938667 52.938667 0 0 1 0-56.789334C215.978667 290.730667 355.552 192 512 192z m0 128c-106.037333 0-192 85.962667-192 192s85.962667 192 192 192 192-85.962667 192-192-85.962667-192-192-192z m0 320c70.688 0 128-57.312 128-128s-57.312-128-128-128-128 57.312-128 128 57.312 128 128 128z" p-id="2795" />
              </svg>
              <span>{article.view}</span>
            </div>
          </div>
        </div>
        {/* <Markdown rehypePlugins={[rehypeRaw]}>{article.content}</Markdown> */}
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
          {article.content}
        </Markdown>
      </div>
      <Signature />
    </div>
  );
}
