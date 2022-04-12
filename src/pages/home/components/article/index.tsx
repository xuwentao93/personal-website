import * as React from 'react';
import './index.less';
import { dateFormat } from '@/utils';
import { ArticleType } from '@/constant/enum';

export interface Article {
  time: number // 文章发布时间
  title: string // 标题
  brief: string // 简介
  cover?: string // 封面图片地址
  // 文章类型
  type: ArticleType.life | ArticleType.frontend | ArticleType.algorithm | ArticleType.network | ArticleType.other
  subtype?: string // 文章子类型
  view: number // 浏览次数
  id: string // 标识文章唯一的 id
}

interface ArticleProp {
  articleList: Article[]
}

const typeMap = {
  [ArticleType.life]: {
    text: '生活',
    color: '#67C23A'
  },
  [ArticleType.frontend]: {
    text: '前端',
    color: '#49f'
  },
  [ArticleType.algorithm]: {
    text: '算法',
    color: '#E6A23C'
  },
  [ArticleType.network]: {
    text: '网络',
    color: '#c41d7f'
  },
  [ArticleType.other]: {
    text: '其他',
    color: '#f66'
  }
};

export default function ArticleList(props: ArticleProp) {
  const { articleList } = props;

  return (
    <div className="personal-article-list-component-page">
      {articleList.length === 0 && (
        <div>啊没有资源</div>
      )}
      {articleList.map((article: Article) => (
        <div className="article-list" key={article.id}>
          <div className="article" onClick={() => window.open(`./article/${article.id}`)}>
            <div className="article-info">
              <div className="article-left-message">
                <div className="title">{article.title}</div>
                <div className="brief">{article.brief}</div>
                <div className="article-bottom-info">
                  <svg className="eye" viewBox="0 0 1024 1024">
                    {/* eslint-disable-next-line max-len */}
                    <path d="M512 836.266667C230.4 836.266667 74.666667 533.333333 68.266667 520.533333c-4.266667-8.533333-4.266667-19.2 0-29.866666 6.4-12.8 164.266667-315.733333 443.733333-315.733334 281.6 0 437.333333 305.066667 443.733333 317.866667 4.266667 8.533333 4.266667 19.2 0 29.866667-6.4 10.666667-162.133333 313.6-443.733333 313.6zM132.266667 505.6c34.133333 57.6 170.666667 266.666667 379.733333 266.666667s345.6-209.066667 379.733333-266.666667c-34.133333-57.6-170.666667-266.666667-379.733333-266.666667S166.4 448 132.266667 505.6z" p-id="3123" />
                    {/* eslint-disable-next-line max-len */}
                    <path d="M512 650.666667c-76.8 0-138.666667-61.866667-138.666667-138.666667s61.866667-138.666667 138.666667-138.666667 138.666667 61.866667 138.666667 138.666667-61.866667 138.666667-138.666667 138.666667z m0-213.333334c-40.533333 0-74.666667 34.133333-74.666667 74.666667s34.133333 74.666667 74.666667 74.666667 74.666667-34.133333 74.666667-74.666667-34.133333-74.666667-74.666667-74.666667z" p-id="3124" />
                  </svg>
                  <div className="view">{article.view}</div>
                  <div className="time">{dateFormat(article.time)}</div>
                  <span style={{ color: typeMap[article.type]?.color }}>{typeMap[article.type]?.text}</span>
                  {article.subtype && (<span className="sub-type">{article.subtype}</span>)}
                </div>
              </div>
              <div className="article-right-message">
                {article.cover && <img src={article.cover} className="article-cover" alt="" />}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
