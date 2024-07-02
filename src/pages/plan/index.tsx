import * as React from 'react';
import { useState, useEffect } from 'react';
import { TITLE_LIST } from './constant';
// import { tab } from 'antd';
import './index.less';

export default function Plan() {
  const [titleSelected, setTitleSelected] = useState(TITLE_LIST[0]);

  useEffect(() => {

  }, []);

  return (
    <div className="personal-plan-page">
      <div className="title-list-container">
        <div className="title-list">
          {TITLE_LIST.map((title) => (
            <div
              className="title"
              key={title}
              onClick={() => setTitleSelected(title)}
              style={titleSelected === title ? { color: '#49f' } : {}}
            >
              {title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
