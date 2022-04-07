import * as React from 'react';
import { useState, useEffect } from 'react';
import Navigation from '@/components/NewNavigation';
import { ArticleType } from '@/constant/enum';
import { getArticleList } from '@/api';
import { titleListMap, TitieListType } from '@/constant';
import ArticleList, { Article } from './components/article';
import './index.less';

const test: Article[] = [
  {
    time: 1645543553232,
    title: '技术文章',
    brief: '学习技术从我开始',
    cover: 'https://lupic.cdn.bcebos.com/20191203/3015899590_14.jpg',
    type: ArticleType.frontend,
    subtype: '',
    view: 0,
    id: '1af'
  },
  {
    time: 1645543553232,
    title: '生活厨房小技巧',
    brief: '米饭的做法, 米饭原来这样做最好吃!哈哈哈哈哈哈哈哈, 哈哈哈哈哈哈哈哈, 哈哈哈哈哈哈哈哈, 步骤如下: 第一步, 先这样, 然后这样, 接着在这样, 放点葱, 撒点盐, 加点水, 哈哈哈哈, 最后在这样',
    cover: 'https://t10.baidu.com/it/u=3478178322,3938598485&fm=58',
    type: ArticleType.life,
    subtype: '做饭',
    view: 0,
    id: '1ff'
  },
  {
    time: 1645543553232,
    title: '从输入 url 到呈现页面都经历了什么?',
    brief: '这篇文章教你面试技巧',
    cover: 'https://lupic.cdn.bcebos.com/20191203/3015899590_14.jpg',
    type: ArticleType.network,
    subtype: '',
    view: 0,
    id: 'fff'
  },
  {
    time: 1645543553232,
    title: '双数之和',
    brief: '双数之和的多种解法',
    cover: 'https://lupic.cdn.bcebos.com/20191203/3015899590_14.jpg',
    type: ArticleType.algorithm,
    subtype: '',
    view: 0,
    id: '30f'
  },
  {
    time: 1645543553232,
    title: '日记',
    brief: '今天早上天气很好, 我吃了早饭然后开始工作.',
    cover: 'https://lupic.cdn.bcebos.com/20191203/3015899590_14.jpg',
    type: ArticleType.life,
    subtype: '日记',
    view: 0,
    id: '433'
  },
  {
    time: 1645543553232,
    title: 'react 还能这么用',
    brief: 'react hooks 的最新用法, 这样这样, 然后在那样那样',
    // eslint-disable-next-line max-len
    cover: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
    type: ArticleType.frontend,
    subtype: 'react',
    view: 3,
    id: 'aac'
  },
  {
    time: 1645543553232,
    title: '幽港迷城',
    brief: '恭喜幽港迷城荣登桌游第一名!下面我为大家带来幽港迷城的教程',
    // eslint-disable-next-line max-len
    cover: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2F4908245704e3342e37379cf690a396de.jpeg&app=2000&size=f260,344&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=3075454fbfc102c4023571efef27d961',
    type: ArticleType.life,
    subtype: '桌游',
    view: 40,
    id: 'adb'
  },
  {
    time: 1645543553232,
    title: '去桂林旅游',
    brief: '5.1 到了, 可以和自己最喜欢的人去好玩的地方旅游了',
    cover: 'https://t12.baidu.com/it/u=1561740716,2588115196&fm=58',
    type: ArticleType.life,
    subtype: '旅游',
    view: 15,
    id: 'abc'
  }
];

export default function Home() {
  const [titleList, setTitleList] = useState<TitieListType[]>([]);

  const methods = {
    selectTitle(code: number, i: number) {
      console.log(code);
      const curTitleList = ([] as TitieListType[]).concat(titleListMap);
      curTitleList.forEach(title => {
        title.selected = false;
      });
      curTitleList[i].selected = true;
      setTitleList(curTitleList);
    },
    getArticleList(type: ArticleType) {
      getArticleList({
        type
      }).then(res => {
        console.log(res);
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
        <ArticleList articleList={test} />
      </div>
    </div>
  );
}
