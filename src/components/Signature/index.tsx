import * as React from 'react';
import './index.less';

export default function Signature() {
  return (
    <div className="personal-signature-component" onClick={() => window.open('https://beian.miit.gov.cn')}>
      浙ICP备19046748号-2
    </div>
  );
}
