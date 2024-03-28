import * as React from 'react';
import { useEffect } from 'react';
// import './index.less';

export default function Emprt() {
  useEffect(() => {
    console.log('render success');
  }, []);

  return (
    <div className="emprt">emprt</div>
  );
}
