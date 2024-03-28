import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.less';
import Navigation from '@/components/Navigation';
import Signature from '@/components/Signature';

export default function Cover() {
  const navigate = useNavigate();

  const [move, setMove] = useState(0);

  const body: React.MutableRefObject<any> = useRef();

  const scrollBody = () => {
    const container = body.current;
    setMove(container.scrollTop / 4);
  };

  return (
    <div className="personal-cover-page" onScroll={scrollBody} ref={body}>
      <div className="cover">
        <Navigation />
        <div className="center-text">
          <div className="enter-home" onClick={() => navigate('/home')}>
            进入首页
          </div>
          <div>Life is colofor, enjoy it every day.</div>
        </div>
      </div>
      <div className="footer">
        <div className="box" style={{ transform: `translateY(-${move}px)` }}>
          <div className="title">个人简介</div>
          <div className="text">
            大家好，我是徐文韬，是一名前端工程师，定位杭州。生活很美好，希望大家能好好享受生活。
          </div>
        </div>
        <Signature />
      </div>
    </div>
  );
}
