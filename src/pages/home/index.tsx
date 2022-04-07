import * as React from 'react';
import { useState, useEffect } from 'react';
import Navigation from '@/components/NewNavigation';
import { ArticleType } from '@/constant/enum';
import { getArticleList } from '@/api';
import { titleListMap, TitieListType } from '@/constant';
import ArticleList, { Article } from './components/article';
import './index.less';

export default function Home() {
  const [titleList, setTitleList] = useState<TitieListType[]>([]);
  const [articleList, setArticleList] = useState<Article[]>([]);

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
      getArticleList({
        type
      }).then((res: any) => {
        if (res.success) {
          setArticleList(res.data);
        }
      });
    },
    focusInput() {

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
      <div className="center">
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
        <ArticleList articleList={articleList} />
      </div>
    </div>
  );
}
