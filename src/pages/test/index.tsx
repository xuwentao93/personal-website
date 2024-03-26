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
import './index.less';
import layout from '@/components/Hoc';

const Theme = createContext('');

function Test() {
  console.log('render');
  const [count, setCount] = useState(5);

  const [isLoading, setIsLoading] = useState(true);

  const inner: React.MutableRefObject<any> = useRef();
  const learnCallbackRef: React.MutableRefObject<any> = useRef(null);

  const child = React.createRef();

  const getTarget = (e: React.MouseEvent) => {
    const id = document.getElementById('test');
    const before = document.getElementById('before');
    const test = document.createElement('div');
    test.innerHTML = '123123';
    (id as HTMLElement).insertBefore(test, before);

    console.log('e.target', e.target);
    console.log('e.currentTarget', e.currentTarget);
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

  const testArrayFunction = () => {
    const arr = [1, 2, 3, 4, 5, 10];

    // arr.forEach2((item, index, array) => {
    //   console.log(item);
    //   console.log(index);
    //   console.log(array);
    // });

    // const getMap = arr.map2((item, index, array) => {
    //   console.log(item);
    //   console.log(index);
    //   console.log(array);
    //   return item * 2;
    // });

    // const getFilter = arr.filter2((item: number) => item < 5);

    // console.log(arr.reduce2((acc, item) => acc + item, 5));
  };

  const testFunction = () => {
    // const obj = { item: 10 };
    // const thisObj = { item: 5 };
    // function Change(content: { item?: number }) {
    //   console.log(content?.item);
    //   console.log(this?.item);
    // }

    // Change.call2(thisObj, obj);
  };

  const ChildWithLoading = layout(Child);

  useEffect(() => {
    // testDeepClone();

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    testArrayFunction();
    testFunction();
  }, []);

  return (
    <div className="test" id="test">
      {/* 学习 target 和 currentTarget 的区别 */}
      <div className="test-inner" ref={inner} onClick={getTarget}>
      </div>
      <Theme.Provider value="theme">
        {/* {Layout(() => <Child child={child} />)} */}
        <ChildWithLoading isLoading={isLoading} child={child} />
      </Theme.Provider>

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

function Child(props: { child: React.Ref<unknown> }) {
  const { child } = props;

  const [A, setA] = useState(1);
  console.log('render child');

  const childFunc = () => {
    console.log('this is a child function! you got it from useImpretiveHandle!');
  };

  useImperativeHandle(child, () => ({ childFunc }));

  return <div onClick={() => setA(2)}>child component</div>;
}

export default memo(Test);
