import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';

interface MessageProps {
  text: string | number,
  background: string,
  color: string,
  borderColor: string
}

function Message(props: MessageProps) {
  const {
    background, color, text, borderColor
  } = props;

  return (
    <div className="personal-message-component" style={{ background, color, borderColor }}>
      {text}
    </div>
  );
}

const message = {
  show(text: string | number, background: string, color: string, borderColor: string) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(
      <Message background={background} color={color} text={text} borderColor={borderColor} />,
      div
    );
    setTimeout(() => {
      document.body.removeChild(div);
    }, 2000);
  },
  success(text: string | number) {
    message.show(text, '#f6ffed', '#333', '#b7eb8f');
  },
  info(text: string | number) {
    message.show(text, '#e6f7ff', '#333', '#91d5ff');
  },
  warn(text: string | number) {
    message.show(text, '#fffbe6', '#333', '#ffe58f');
  },
  error(text: string | number) {
    message.show(text, '#fff2f0', '#333', '#ffccc7');
  }
};

export default message;
