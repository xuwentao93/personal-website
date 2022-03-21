import * as React from 'react';
import { useState } from 'react';
import './index.less';

export default function NewNavigation() {
  const [focus, setFocus] = useState(false);

  return (
    <div className="navigation">
      <img
        src="https://img.alicdn.com/imgextra/i3/O1CN01tCQx6r1vGuwZuW4jd_!!6000000006146-2-tps-936-844.png"
        className="avatar"
        alt=""
      />
      <div className="name">Wentao Xu</div>
      <div
        className="input-container"
        style={focus ? {
          backgroundColor: '#fff',
          borderColor: '#1e80ff'
        } : {}}
      >
        <input
          type="text"
          className="input"
          placeholder="搜索"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <img
          src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6401156ae5d55b2253b3d2351231f02c.svg"
          className="search-icon"
          alt=""
        />
      </div>
    </div>
  );
}
