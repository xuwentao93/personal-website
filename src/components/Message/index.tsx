import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';

interface MessageProps {
  text: string | number,
  background: string,
  color: string
}

function Message(props: MessageProps) {
  const { background, color, text } = props;

  return (
    <div className="personal-message-component" style={{ background, color }}>{text}</div>
  );
}

const message = {
  show(text: string | number, background: string, color: string) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(
      <Message background={background} color={color} text={text} />,
      div
    );
    setTimeout(() => {
      document.body.removeChild(div);
    }, 2000);
  },
  success(text: string | number) {
    message.show(text, '#67C23A', '#fff');
  },
  info(text: string | number) {
    message.show(text, '#49f', '#fff');
  },
  warn(text: string | number) {
    message.show(text, '#e6a23c', '#fff');
  },
  error(text: string | number) {
    message.show(text, '#f56c6c', '#fff');
  }
};

export default message;
