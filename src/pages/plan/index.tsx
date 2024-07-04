import * as React from 'react';
import { useState, useEffect } from 'react';
import { TITLE_LIST, PlanType } from './constant';
// import { tab } from 'antd';
import './index.less';

export default function Plan() {
  const [titleSelected, setTitleSelected] = useState(PlanType.regular);

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
