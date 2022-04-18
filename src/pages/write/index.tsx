import * as React from 'react';
import {
  useState,
  useRef,
  useMemo,
  useEffect,
  useReducer
} from 'react';
import { useHistory } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import rehypeRaw from 'rehype-raw';
import 'react-markdown-editor-lite/lib/index.css';
import { titleListMap, TitieListType } from '@/constant';
import {
  getArticle,
  getDraft,
  modifyArticle,
  saveDraft,
  writeArticle
} from '@/api';
import Tag from '@/components/Tag';
import message from '@/components/Message';
import Signature from '@/components/Signature';
import { ArticleType } from '@/constant/enum';
import { getQueryString } from '@/utils';
import { reducer, initialParams, writeType } from './constant';
import './index.less';

const mdParser = new MarkdownIt();
let timer: number;

export default function Write() {
  const history = useHistory();
  const id = getQueryString('id');

  const [modal, setModal] = useState(false);
  // eslint-disable-next-line max-len
  const [tagList, setTagList] = useState<TitieListType[]>(titleListMap.filter(item => item.code !== ArticleType.all && item.code !== ArticleType.current));
  const [writeParams, setWriteParams] = useReducer(reducer, initialParams);

  const view = useRef<HTMLDivElement>(null);

  const methods = {
    write({ text }: any) {
      clearTimeout(timer);
      setWriteParams({
        type: writeType.text,
        value: text
      });
      timer = window.setTimeout(methods.saveDraft, 2000);
    },
    sychronizeScroll(type: 'editor' | 'view') {
      const textarea = document.getElementsByName('textarea')[0];
      // 不做类型断言会被判断为 null.
      const { scrollTop, offsetHeight, scrollHeight } = (view.current as HTMLDivElement);
      // 注意这里必须一个 ceil 一个 floor, 否则文章会以 1px 下/上移.
      if (type === 'editor') {
        (view.current as HTMLDivElement).scrollTop
          // eslint-disable-next-line max-len
          = Math.ceil((textarea.scrollTop * (scrollHeight - offsetHeight)) / (textarea.scrollHeight - textarea.offsetHeight));
      } else if (type === 'view') {
        textarea.scrollTop
          = Math.floor((scrollTop * (textarea.scrollHeight - textarea.offsetHeight)) / (scrollHeight - offsetHeight));
      }
    },
    setTitle(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.value.length > 16) {
        message.error('标题的长度必须在 16 以内!');
        return;
      }
      clearTimeout(timer);
      timer = window.setTimeout(methods.saveDraft, 2000);
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
      if (writeParams.title === '') {
        message.error('标题不能为空!');
        return;
      }
      // 前端的枚举值是 0, 需要额外注意.
      if (!writeParams.type && writeParams.type !== ArticleType.frontend) {
        message.error('类型不能为空!');
        return;
      }
      if (!writeParams.text) {
        message.error('文章内容不能为空!');
        return;
      }
      if (id) {
        modifyArticle({
          ...writeParams,
          id
        }).then((res: any) => {
          if (res.success) {
            setModal(false);
            message.success('修改成功!');
            history.push('./home');
          } else {
            message.error(res.message || '上传失败!');
          }
        });
      }
      writeArticle(writeParams).then((res: any) => {
        if (res.success) {
          setModal(false);
          message.success('上传成功!');
          history.push('./home?type=current');
        } else {
          message.error(res.message || '上传失败!');
        }
      });
    },
    getDraft() {
      if (id) {
        getArticle({ id })
          .then((res: any) => {
            if (res.success) {
              setWriteParams({
                value: res.data,
                type: 'all'
              });
            }
          })
          .catch(err => console.error(err));
      } else {
        getDraft().then((res: any) => {
          if (res.success) {
            setWriteParams({
              value: res.data,
              type: 'all'
            });
          }
        });
      }
    },
    saveDraft() {
      saveDraft({
        title: writeParams.title,
        text: writeParams.text
      })
        .then((res: any) => {
          if (res.success) {
            // 提示保存成功.
          }
        })
        .catch(err => console.error(err));
    }
  };

  const renderWrite = useMemo(methods.renderWrite, [writeParams.text]);

  useEffect(() => {
    methods.getDraft();
  }, []);

  return (
    <div className="personal-write-page">

      <div className="navigation">
        <div className="input-container">
          <input
            className="title-input"
            placeholder="请输入标题, 最多十六字"
            onChange={methods.setTitle}
            value={writeParams.title}
          />
        </div>
        <div className="button" onClick={() => setModal(true)}>
          <span style={{ marginRight: '6px' }}>上</span>
          <span>传</span>
        </div>
      </div>

      {renderWrite}

      {modal && (
        <div className="block" onClick={() => setModal(false)}>
          <div className="center-box" onClick={e => e.stopPropagation()}>
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
              <div className="title">密码:</div>
              <div className="value">
                <input
                  value={writeParams.code}
                  className="wt-input"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWriteParams({
                    type: writeType.code,
                    value: e.target.value
                  })}
                />
              </div>
            </div>
            <div className="modal-line">
              <div className="title">子类型:</div>
              <div className="value">
                <input
                  value={writeParams.subtype}
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
                  value={writeParams.cover}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWriteParams({
                    type: writeType.cover,
                    value: e.target.value
                  })}
                  style={{ width: '450px' }}
                />
              </div>
            </div>
            <div className="modal-line">
              <div className="title">文章简介:</div>
              <div className="value">
                <input
                  value={writeParams.brief}
                  className="wt-input"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWriteParams({
                    type: writeType.brief,
                    value: e.target.value
                  })}
                  style={{ width: '450px' }}
                />
              </div>
            </div>
          </div>

        </div>
      )}
      <Signature />
    </div>
  );
}
