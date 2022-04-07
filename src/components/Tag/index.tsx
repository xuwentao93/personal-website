import * as React from 'react';
import { memo } from 'react';
import './index.less';

interface TagProps {
  text: string,
  selected: boolean,
  onClick?: Function
}

function Tag(props: TagProps) {
  const { text, selected, onClick } = props;

  const methods = {
    onClick() {
      if (onClick) onClick();
    }
  };

  return (
    <div
      className="personal-tag-component"
      style={selected ? {
        border: '1px solid #91d5ff',
        backgroundColor: '#e6f7ff',
        color: '#096dd9'
      } : {}}
      onClick={methods.onClick}
    >
      {text}
    </div>
  );
}

export default memo(Tag);
