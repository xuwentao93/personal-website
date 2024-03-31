import * as React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Home from '@/pages/home';
import Cover from '@/pages/cover';
import Article from '@/pages/article';
import Write from '@/pages/write';
import Mahjong from '@/pages/mahjong';
import Test from '../pages/test';
import BoardGame from '@/pages/boardGame';
import Plan from '@/pages/plan';
import UploadFile from '@/pages/uploadFile';

interface RouteType {
  path: string,
  Component: React.FC,
  name: string,
  // 渲染组件前加载的数据.
  loadData?: Function
}

export const routes: RouteType[] = [
  {
    path: '/',
    Component: Cover,
    name: 'cover',
  },
  {
    path: '/home',
    Component: Home,
    name: 'home',
  },
  {
    path: '/uploadFile',
    Component: UploadFile,
    name: 'uploadFile',
  },
  {
    path: '/article/:id',
    Component: Article,
    name: 'article',
    loadData: Article.loadData
  },
  {
    path: '/write',
    Component: Write,
    name: 'write',
  },
  {
    path: '/mahjong',
    Component: Mahjong,
    name: 'mahjong',
  },
  {
    path: '/boardGame',
    Component: BoardGame,
    name: 'boardGame',
  },
  {
    path: '/test',
    Component: Test,
    name: 'test'
  },
  {
    path: '/plan',
    Component: Plan,
    name: 'plan'
  }
];

export default function App() {
  return (
    <Routes>
      {routes.map(({ path, name, Component, loadData }) => (
        <Route path={path} key={name} element={<Component />} loadData={loadData} />
      ))}
    </Routes>
  );
}
