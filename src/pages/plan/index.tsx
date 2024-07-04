import * as React from 'react';
import { useState, useEffect } from 'react';
import { TITLE_LIST, PlanType } from './constant';
import Progress from './components/progress';
import Daily from './components/daily';
import List from './components/list';
import Record from './components/record';
import Regular from './components/regular';

import './index.less';

const listComponent = {
  [PlanType.regular]: <Regular />,
  [PlanType.list]: <List />,
  [PlanType.daily]: <Daily />,
  [PlanType.progress]: <Progress />,
  [PlanType.record]: <Record />
}

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
      <div className="content-container">
        {listComponent[PlanType.regular]}
      </div>
    </div>
  );
}
