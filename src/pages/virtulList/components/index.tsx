import * as React from 'react';
import { useState, useEffect } from 'react';
import './index.less';

interface ItemProp {
  estimateSize: number
}

export default function Item(props: ItemProp) {
  const { estimateSize } = props;

  useEffect(() => {

  }, []);

  return (
    <div className="item">item</div>
  );
}
