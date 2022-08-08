import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';

interface MessageProps {
  text: string | number,
  icon: string
}

function Message(props: MessageProps) {
  const {
    icon,
    text
  } = props;

  return (
    <div className="personal-message-component">
      <img src={icon} className="icon" alt="" />
      {text}
    </div>
  );
}

const message = {
  show(text: string | number, icon: string) {
    const div = document.createElement('div');
    console.log(icon);
    document.body.appendChild(div);
    ReactDOM.render(
      <Message icon={icon} text={text} />,
      div
    );
    setTimeout(() => {
      document.body.removeChild(div);
    }, 2000);
  },
  success(text: string | number) {
    message.show(text, 'https://img.alicdn.com/imgextra/i2/O1CN01Y0tYeU1C8X1UCmZW1_!!6000000000036-2-tps-80-80.png');
  },
  info(text: string | number) {
    message.show(text, 'https://img.alicdn.com/imgextra/i2/O1CN01UC05Ca1KE2imi8ZFC_!!6000000001131-2-tps-260-260.png');
  },
  warn(text: string | number) {
    message.show(text, 'https://img.alicdn.com/imgextra/i4/O1CN01rLHvOo1fg4tO8cTDS_!!6000000004035-2-tps-80-80.png');
  },
  error(text: string | number) {
    message.show(text, 'https://img.alicdn.com/imgextra/i4/O1CN01JZcmAg1bZQg8Es9LA_!!6000000003479-2-tps-80-80.png');
  }
};

export default message;
