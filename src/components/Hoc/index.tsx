import * as React from 'react';
import { useEffect, useState } from 'react';
import './index.less';

function layout(ReactComponent) {
  return function ({ isLoading, ...props }) {
    if (isLoading) {
      return <div>loading</div>;
    }

    return (
      <div className="layout">
        <ReactComponent />
      </div>
    );
  };
}

export default layout;
