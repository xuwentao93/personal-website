import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import './index.less';
import * as utils from '../../interview.js';

// const debounce = utils.debounce(() => {
//   console.log(1);
// }, 500);

// const throttle = utils.throttle(() => {
//   console.log('throttle');
// }, 500);

const { NewPromise, deepClone } = utils;

export default function Test() {
  const [count, setCount] = useState(0);
  const [cloSureNum, setCloSureNum] = useState(0);

  const inner: React.MutableRefObject<any> = useRef();
  const learnCallbackRef: React.MutableRefObject<any> = useRef(null);

  const getTarget = (e: React.MouseEvent) => {
    console.log('e.target', e.target);
    console.log('e.currentTarget', e.currentTarget);
  };

  const testDeepClone = () => {
    const obj = {
      a: 1
    };

    const largeObj = {
      a: obj,
      b: obj,
      c: obj
    };
    const newObj = deepClone(largeObj);
    // console.log(newObj);
    // console.log(newObj.b === newObj.a);
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
    const obj = { item: 10 };
    const thisObj = { item: 5 };
    function Change(content: { item?: number }) {
      console.log(content?.item);
      console.log(this?.item);
    }

    Change.call2(thisObj, obj);
  };

  useEffect(() => {
    testDeepClone();
    testArrayFunction();
    testFunction();

    // 学习 requestAnimationFrame.
    const timer = setTimeout(() => {
      requestAnimationFrame(grow);
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
    <div className="test">
      {/* 学习 target 和 currentTarget 的区别 */}
      <div className="test-inner" ref={inner} onClick={getTarget}>
      </div>

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

      <div>{cloSureNum}</div>
    </div>
  );
}
