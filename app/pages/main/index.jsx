import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { renderRoutes } from '@/utils/route';
import './index.less';
import Navigator from './navigator';
import Footer from './footer';
import Profile from './profile';
import Situation from './situation';
import Articles from './articles';
import Recommond from './recommand';
import Recently from './recently';

export default function Container({ routes }) {
  return (
    <>
      <Navigator />
      <div className="block" />
      <Switch>
        <Route path="/main" exact component={Main} />
        { renderRoutes(routes) }
      </Switch>
      <Footer />
    </>
  );
}

function Main() {
  const width = window.innerWidth;
  const [type, setType] = useState('all');
  console.log(type);
  if (width > 700) {
    return (
      <div className="main">
        <div className="left">
          <Profile />
        </div>
        <div className="right">
          <Recommond />
          <Recently />
        </div>
        <div className="center">
          <Situation />
          <Articles setType={setType} />
        </div>
      </div>
    );
  }
  return (
    <div className="main">
      <Situation />
      <Recommond />
      <Recently />
      <Articles />
    </div>
  );
}

Container.propTypes = {
  routes: PropTypes.array.isRequired
};
