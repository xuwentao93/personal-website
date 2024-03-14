/* eslint-disable guard-for-in */
import * as React from 'react';
import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  memo,
  createContext,
  useContext
} from 'react';
import './index.less';
import layout from '@/components/Hoc';
import * as utils from '../../interview.js';
import { Hhh } from '@/type';

// const debounce = utils.debounce(() => {
//   console.log(1);
// }, 500);

// const throttle = utils.throttle(() => {
//   console.log('throttle');
// }, 500);

console.log(Hhh.calculate());

class A {
  private readonly x = 10;
}
// 入参名不需要和定义的类型匹配.
const h: (name: string) => string = ff => '1';

const { NewPromise, deepClone } = utils;

const Theme = createContext('');

function Test() {
  const [count, setCount] = useState(0);
  const [cloSureNum, setCloSureNum] = useState(0);
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
    testArrayFunction();
    testFunction();
    // eslint-disable-next-line no-unused-expressions
    child?.current?.childFunc();

    // Promise.resolve()
    //   .then(() => {
    //     console.log(0);
    //     return Promise.resolve(4);
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });

    // Promise.resolve()
    //   .then(() => {
    //     console.log(1);
    //   })
    //   .then(() => {
    //     console.log(2);
    //   })
    //   .then(() => {
    //     console.log(3);
    //   })
    //   .then(() => {
    //     console.log(5);
    //   })
    //   .then(() => {
    //     console.log(6);
    //   });

    // 学习 requestAnimationFrame.
    const timer = setTimeout(() => {
      requestAnimationFrame(grow);
      setIsLoading(false);
    }, 1000);

    const closureTime = setInterval(() => {
      setCloSureNum(num => num + 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(closureTime);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      setCount(Math.random() * 9999);
    }
  }, [count]);

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
      <div onClick={() => setCount(0)} className="count">{count}</div>

      {/* 学习 三角形 */}
      <div className="triangle" />

      <div className="line" id="before"></div>

      <div>{cloSureNum}</div>
    </div>
  );
}

function Child(props: { child: React.Ref<unknown> }) {
  const { child } = props;

  const childFunc = () => {
    console.log('this is a child function! you got it from useImpretiveHandle!');
  };

  useImperativeHandle(child, () => ({ childFunc }));

  return <div>child component</div>;
}

export default memo(Test);
