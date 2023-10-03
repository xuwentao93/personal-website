import * as React from 'react';
import { Input } from 'antd';
import { useState, useEffect } from 'react';
import './index.less';

export default function mahjong() {
  const [ben, setBen] = useState(0);
  const [east, setEast] = useState(25000);
  const [south, setSouth] = useState(25000);
  const [north, setNorth] = useState(25000);
  const [west, setWest] = useState(25000);

  useEffect(() => {

  }, []);

  return (
    <div className="personal-mahjong-page">
      this is not work
      slad
    </div>
  );
}
