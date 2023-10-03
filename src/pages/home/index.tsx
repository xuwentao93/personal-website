import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/NewNavigation';
import { ArticleType } from '@/constant/enum';
import { getArticleList } from '@/api';
import { titleListMap, TitieListType } from '@/constant';
import Loading from '@/components/Loading';
import LeftDecoration from './components/leftDecoration';
import ArticleList, { Article } from './components/article';
import './index.less';

export default function Home() {
  const [titleList, setTitleList] = useState<TitieListType[]>([]);
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reachBottom, setReachBottom] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const main = useRef<HTMLDivElement>(null);

  const methods = {
    selectTitle(code: number, i: number) {
      const curTitleList = ([] as TitieListType[]).concat(titleListMap);
      curTitleList.forEach(title => {
        title.selected = false;
      });
      curTitleList[i].selected = true;
      setTitleList(curTitleList);
      methods.getArticleList(code);
    },
    getArticleList(type: ArticleType) {
      setLoading(true);
      getArticleList({
        type,
        page
        // pageSize: 1
      }).then((res: any) => {
        setLoading(false);
        if (res.success) {
          if (res?.data?.records) {
            if (res?.data?.records?.length + articleList.length === res.data.totalCount) setReachBottom(true);
            else setReachBottom(false);
            setTotalCount(res.data.totalCount || 0);
            setArticleList(res?.data?.records || []);
          }
        }
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    },
    getMoreArticleList() {
      if (articleList.length === totalCount || loading) return;
      const { scrollTop, offsetHeight, scrollHeight } = (main.current as HTMLDivElement);
      if (scrollTop + offsetHeight + 200 > scrollHeight) {
        setPage(page + 1);
        methods.getArticleList(page + 1);
      }
    }
  };

  useEffect(() => {
    const curTitleListMap = ([] as TitieListType[]).concat(titleListMap);
    curTitleListMap[0].selected = true;
    setTitleList(curTitleListMap);
    methods.getArticleList(ArticleType.all);
  }, []);

  return (
    <div className="personal-home-page">
      <Navigation />
      <div className="title-list-container">
        <div className="title-list">
          {titleList.map((title, i) => (
            <div
              className="title"
              key={title.code}
              onClick={() => methods.selectTitle(title.code, i)}
              style={title.selected ? { color: '#49f' } : {}}
            >
              {title.text}
            </div>
          ))}
        </div>
      </div>
      <div className="main" ref={main} onScroll={methods.getMoreArticleList}>
        <LeftDecoration />
        <div className="center">
          <ArticleList articleList={articleList} />
          {loading && (
            <div className="loading-container">
              <Loading loading={loading} />
              <div className="loading-text">加载中...</div>
            </div>
          )}
          {reachBottom && (
            <div className="bottom-text">已经到底啦!</div>
          )}
        </div>
      </div>
    </div>
  );
}
