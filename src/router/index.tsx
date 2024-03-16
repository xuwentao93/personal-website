import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from '@/pages/home';
import Cover from '@/pages/cover';
import Article from '@/pages/article';
import Write from '@/pages/write';
import Mahjong from '@/pages/mahjong';
import Test from '@/pages/test';
import BoardGame from '@/pages/boardGame';
import Plan from '@/pages/plan';

interface RouteType {
  path: string,
  component: React.FC,
  name: string,
  exact: boolean
}

const routes: RouteType[] = [
  {
    path: '/',
    component: Cover,
    name: 'homepage',
    exact: true
  },
  {
    path: '/home',
    component: Home,
    name: 'main',
    exact: true
  },
  {
    path: '/article/:id',
    component: Article,
    name: 'article',
    exact: true
  },
  {
    path: '/write',
    component: Write,
    name: 'write',
    exact: true
  },
  {
    path: '/mahjong',
    component: Mahjong,
    name: 'mahjong',
    exact: true
  },
  {
    path: '/boardGame',
    component: BoardGame,
    name: 'boardGame',
    exact: true
  },
  {
    path: '/test',
    component: Test,
    name: 'test',
    exact: true
  },
  {
    path: '/plan',
    component: Plan,
    name: 'plan',
    exact: true
  }
];

export default function App() {
  return (
    <Router>
      <Switch>
        {routes.map(route => (
          <Route path={route.path} exact={route.exact} key={route.name}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
