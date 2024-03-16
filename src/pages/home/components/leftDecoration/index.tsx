import * as React from 'react';
import { useHistory } from 'react-router-dom';
import mahjong from '@/assets/mahjong.jpg';
import plan from '@/assets/timebg.jpg';
import boardgame from '@/assets/boardgamebg.jpg';
import './index.less';

interface RenderToolListType {
  img: File,
  url: string
}

// 工具列表.
const renderToolList: RenderToolListType[] = [
  {
    img: mahjong,
    url: 'mahjong'
  },
  {
    img: plan,
    url: 'plan'
  },
  {
    img: boardgame,
    url: 'boardgame'
  }
];

export default function LeftDecoration() {
  const history = useHistory();

  return (
    <div className="personal-left-decoration-component">
      {renderToolList.map(item => (
        <img src={item.img as any} className="item" key={item.url} onClick={() => history.push(`./${item.url}`)} />
      ))}
    </div>
  );
}
