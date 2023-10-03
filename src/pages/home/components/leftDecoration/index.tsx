import * as React from 'react';
import { useHistory } from 'react-router-dom';
import mahjong from '@/assets/mahjong.jpg';
import './index.less';

export default function LeftDecoration() {
  const history = useHistory();

  return (
    <div className="personal-left-decoration-component">
      <img src={mahjong} className="item" alt="" onClick={() => history.push('./mahjong')} />
    </div>
  );
}
