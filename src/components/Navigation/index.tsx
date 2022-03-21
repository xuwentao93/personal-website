import * as React from 'react';
import './index.less';
import github from '@/assets/github.svg';
import juejin from '@/assets/juejin.png';
import zhihu from '@/assets/zhihu.ico';
import gmail from '@/assets/gmail.ico';

const imgList = [
  {
    src: github,
    title: 'https://www.github.com/xuwentao93',
    link: 'https://www.github.com/xuwentao93'
  },
  {
    src: zhihu,
    title: 'https://www.zhihu.com/people/pie-dao-chuan-95-49',
    link: 'https://www.zhihu.com/people/pie-dao-chuan-95-49'
  },
  {
    src: juejin,
    title: 'https://juejin.im/user/5da17f266fb9a04dde146c5d',
    link: 'https://juejin.im/user/5da17f266fb9a04dde146c5d'
  },
  {
    src: gmail,
    title: 'a15157756529@gmail.com',
    link: 'mailto:a15157756529@gmail.com'
  }
];

interface NavigationProps {
  nameColor?: string
}

export default function Navigation({ nameColor = '' } : NavigationProps) {
  return (
    <div className="personal-navigation-component">
      <img
        src="https://img.alicdn.com/imgextra/i3/O1CN01tCQx6r1vGuwZuW4jd_!!6000000006146-2-tps-936-844.png"
        className="avatar"
        alt=""
      />
      <div className="name" style={nameColor ? { color: nameColor } : {}}>
        Wentao Xu
      </div>
      <div className="icon-list">
        {imgList.map(icon => (
          <a href={icon.link} title={icon.title} key={icon.link}>
            <img src={icon.src} alt="" className="icon" />
          </a>
        ))}
      </div>
    </div>
  );
}

// Navigation.defaultProps = {
//   nameColor: ''
// };
