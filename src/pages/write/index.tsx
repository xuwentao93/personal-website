import * as React from 'react';
import {
  useState,
  useRef,
  useMemo,
  useReducer
} from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import rehypeRaw from 'rehype-raw';
import 'react-markdown-editor-lite/lib/index.css';
import { titleListMap, TitieListType } from '@/constant';
import { writeArticle } from '@/api';
import Tag from '@/components/Tag';
import { ArticleType } from '@/constant/enum';
import { reducer, initialParams, writeType } from './constant';
import './index.less';

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function Write() {
  const [modal, setModal] = useState(false);
  // eslint-disable-next-line max-len
  const [tagList, setTagList] = useState<TitieListType[]>(titleListMap.filter(item => item.code !== ArticleType.all && item.code !== ArticleType.current));
  const [writeParams, setWriteParams] = useReducer(reducer, initialParams);

  const view = useRef<HTMLDivElement>(null);

  const methods = {
    write({ text }: any) {
      setWriteParams({
        type: writeType.text,
        value: text
      });
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
    setTitle(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.value.length > 16) return;
      setWriteParams({
        type: writeType.title,
        value: e.target.value
      });
    },
    renderWrite() {
      return (
        <div className="markdown-container">
          <MdEditor
            value={writeParams.text}
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
              {writeParams.text}
            </Markdown>
          </div>
        </div>
      );
    },
    selectedTag(code: number, i: number) {
      const curTagList = ([] as TitieListType[]).concat(tagList);
      curTagList.forEach((item, index) => {
        curTagList[index].selected = false;
      });
      curTagList[i].selected = true;
      setTagList(curTagList);
      setWriteParams({
        type: writeType.type,
        value: code
      });
    },
    writeArticle() {
      writeArticle(writeParams).then(res => {
        console.log(res);
      });
    }
  };

  const renderWrite = useMemo(methods.renderWrite, [writeParams.text]);

  return (
    <div className="personal-write-page">

      <div className="navigation">
        <div className="input-container">
          <input
            className="title-input"
            placeholder="请输入标题, 最多十六字"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => methods.setTitle(e)}
          />
        </div>
        <div className="button" onClick={() => setModal(true)}>
          <span style={{ marginRight: '6px' }}>上</span>
          <span>传</span>
        </div>
      </div>

      {renderWrite}

      {modal && (
        <div className="block">
          <div className="center-box">
            <svg viewBox="0 0 1045 1024" width="16" height="16" className="close-icon" onClick={() => setModal(false)}>
              {/* eslint-disable-next-line max-len */}
              <path d="M282.517333 213.376l-45.354666 45.162667L489.472 512 237.162667 765.461333l45.354666 45.162667L534.613333 557.354667l252.096 253.269333 45.354667-45.162667-252.288-253.44 252.288-253.482666-45.354667-45.162667L534.613333 466.624l-252.096-253.226667z" p-id="6736" fill="#8a8a8a" />
            </svg>
            <div className="modal-line">
              <div className="title">类型:</div>
              <div className="value">
                {tagList.map((tag, i) => (
                  <Tag
                    text={tag.text}
                    selected={tag.selected}
                    key={tag.code}
                    onClick={() => methods.selectedTag(tag.code, i)}
                  />
                ))}
              </div>
            </div>
            <div className="modal-line">
              <div className="title">子类型:</div>
              <div className="value">
                <input
                  className="wt-input"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWriteParams({
                    type: writeType.subtype,
                    value: e.target.value
                  })}
                />
              </div>
            </div>
            <div className="modal-line">
              <div className="title">封面链接:</div>
              <div className="value">
                <input
                  className="wt-input"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWriteParams({
                    type: writeType.cover,
                    value: e.target.value
                  })}
                />
              </div>
            </div>
            <div className="button" onClick={methods.writeArticle}>确认</div>
          </div>

        </div>
      )}

    </div>
  );
}
