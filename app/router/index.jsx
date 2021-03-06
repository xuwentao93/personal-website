import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import Test from '@/components/test';
// eslint-disable-next-line import/no-unresolved
import Editor from '@/pages/editor';
// eslint-disable-next-line import/no-unresolved
import Algorithm from '@/pages/algorithm';
import { renderRoutes } from '@/utils/route';
import Home from '../pages/home';
import Main from '../pages/main';
import Article from '../pages/article';
import NotFind from '../pages/404';
import './index.less';

const routes = [
  {
    component: Home,
    path: '/',
    name: 'home',
    exact: true
  },
  {
    component: Main,
    path: '/main',
    name: 'main',
    routes: [
      {
        component: Article,
        name: 'article',
        path: '/main/article/:id'
      }
    ]
  },
  {
    component: Test,
    path: '/test',
    name: 'test'
  },
  {
    component: Algorithm,
    path: '/algorithm',
    name: 'algorithm'
  },
  {
    component: Editor,
    name: 'editor',
    path: '/editor'
  },
  {
    component: NotFind,
    path: '*',
    name: '404'
  }
];

export default function App() {
  return (
    <Router>
      <Switch>
        { renderRoutes(routes) }
      </Switch>
    </Router>
  );
}
