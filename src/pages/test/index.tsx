/* eslint-disable guard-for-in */
import * as React from 'react';
import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  memo,
  createContext
} from 'react';
import { useNavigate } from 'react-router-dom';
import './index.less';
import { testApi } from '@/api';
import layout from '../../components/Hoc';

const Theme = createContext('');

function Test() {
  const navigate = useNavigate();

  const [count, setCount] = useState(5);

  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);

  const inner: React.MutableRefObject<any> = useRef();
  const learnCallbackRef: React.MutableRefObject<any> = useRef(null);

  const child = React.createRef();

  const getTarget = (e: React.MouseEvent) => {
    const id = document.getElementById('test');
    const before = document.getElementById('before');
    const test = document.createElement('div');
    test.innerHTML = '123123';
    (id as HTMLElement).insertBefore(test, before);

    navigate('/home');
  };

  const grow = () => {
    if (inner.current) {
      inner.current.style.width = parseInt((window.getComputedStyle(inner.current).width as string)) + 1 + 'px';

      if (parseInt(inner.current.style.width) < 400) {
        requestAnimationFrame(grow);
      }
    }
  };

  const createMapRef = () => {
    if (!learnCallbackRef.current) {
      learnCallbackRef.current = new Map();
    }
    return learnCallbackRef.current;
  };

  const getApi = () => {
    testApi().then((res: any) => {
      setList(res);
    });
  };

  const ChildWithLoading = layout(Child);

  useEffect(() => {
  // 获取页面上所有的 img 标签元素
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    getApi();
  }, []);

  return (
    <div className="test" id="test">
      <img
        className="img"
        onClick={() => import('markdown-it')}
        // eslint-disable-next-line max-len
        src="https://plus.unsplash.com/premium_photo-1681406994530-3de7406c21a5?q=80&amp;w=387&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <img
        className="img"
        src="https://pic.616pic.com/bg_w1180/00/14/10/veeG0mYYhh.jpg"
      />
      {/* 学习 target 和 currentTarget 的区别 */}
      <div className="test-inner" ref={inner} onClick={getTarget}>
      </div>
      <Child list={list} child={child} />

      {/* 学习 ref 的回调用法 */}
      {[1, 2, 3, 4, 5].map(item => (
        <div
          key={item}
          ref={node => {
            const map = createMapRef();
            if (node) {
              map.set(item, node);
            } else {
              map.delete(item);
            }
          }}
          onClick={() => console.log(learnCallbackRef.current?.get(item))}
        >
          {item}
        </div>
      ))}

      {/* 学习 useLayoutEffect  */}
      <div onClick={() => setCount(Math.random())} className="count">{count}</div>

      {/* 学习 三角形 */}
      <div className="triangle" />

      <div className="line" id="before"></div>

    </div>
  );
}

function Child(props: { child: React.Ref<unknown>, list: any[] }) {
  const { child, list } = props;

  const [A, setA] = useState(1);

  const childFunc = () => {
    console.log('this is a child function! you got it from useImpretiveHandle!');
  };

  useImperativeHandle(child, () => ({ childFunc }));

  return (
    <div onClick={() => setA(2)}>
      <div>child component</div>
      <div>
        {list.map(item => (
          <div key={item.id} id={item.id}>{item.id}</div>
        ))}
      </div>
    </div>
  );
}

export default memo(Test);
