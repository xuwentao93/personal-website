import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import rehypeRaw from 'rehype-raw';
import Navigation from '@/components/NewNavigation';
import { dateFormat } from '@/utils';
import { viewArticle, deleteArticle } from '@/api';
import './index.less';
import message from '@/components/Message';
import { useArticle } from './articleHook';

export default function Article() {
  const { id } = (useParams() as any);

  const { article, loading } = useArticle(id);
  const [code, setCode] = useState<string | null>();

    const modifyArticleHandle = () => {
      window.open(`/write?id=${id}`);
    };

    const deleteArticleHandle = () => {
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
    };

  useEffect(() => {
    viewArticle({ id });

    // 因为服务端渲染, 浏览器 API 必须延后执行.    
    setCode(localStorage.getItem('code'));
  }, []);

  if (loading) {
    return 'loading';
  }

  return (
    <div className="personal-article-page">
      <Navigation />
      <div className="article-container">
        <h1 className="title-container">
          <div className="title">{article.title}</div>
          {code && (
            <>
              <div className="button button-primary" onClick={modifyArticleHandle}>修改</div>
              <div className="button button-error" onClick={deleteArticleHandle}>删除</div>
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
          {article.text}
        </Markdown>
      </div>
    </div>
  );
}

Article.loadData = useArticle;
