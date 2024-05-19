import * as React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './index.less';



interface Position {
  // 不定高列表中, 元素底部距离滚动顶部的距离.
  top: number,
  // 不定高列表中, 元素顶部距离滚动顶部的距离.
  bottom: number,
  // 元素高度, 初始为 estimateSize, 是一个预估高度.
  height: number
  // 元素下标 index.
  index: number
}
// 定高方案的固定高度.
const itemHeight = 60;
// 不定高方案的预估高度.
const estimateSize = 100;
// 缓冲区比例.
const buffer = 1;
export default function VirtualList() {
  const [visibleNum, setVisibleNum] = useState(0);
  // 偏移量.
  const [startOffset, setStartOffset] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  // 不定高度下, 维护 position 计算每个元素的 bottom.
  const [position, setPosition] = useState<Position[]>([]);
  // 不定高方案下列表的高度.
  const [listHeight, setListHeight] = useState(0);
  // 显示缓冲区上方数据的数量.
  const [above, setAbove] = useState(0);
  // 显示缓冲区下方数据的数量.
  const [after, setAfter] = useState(0);

  const outer = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLDivElement[] | []>([]);

  const dataLength = 10000;
  // 定高方案下列表总高度.
  // const listHeight = itemHeight * dataLength;

  const list = useMemo(() => {
    const l = [];
    for (let i = 0; i < dataLength; i++) {
      let value;
      if (i % 5 === 0) {
        value = i + '. 由于列表项高度不定，并且我们维护了positions，用于记录每一项的位置，而列表高度实际就等于列表中最后一项的底部距离列表顶部的位置。';
      } else if (i % 4 === 0) {
        value = i + '. 由于我们的缓存数据，本身就是有顺序的，所以获取开始索引的方法可以考虑通过二分查找的方式来降低检索次数：';
      } else if (i % 3 === 0) {
        value = i + '. 滚动后将偏移量的获取方式变更';
      } else if (i % 2 === 0) {
        value = i + `. 从演示效果上看，我们实现了基于文字内容动态撑高列表项情况下的虚拟列表，但是我们可能会发现，当滚动过快时，会出现短暂的白屏现象。
        为了使页面平滑滚动，我们还需要在可见区域的上方和下方渲染额外的项目，在滚动时给予一些缓冲，所以将屏幕分为三个区域：`;
      } else {
        value = i + '. 可视区上方渲染条数aboveCount获取方式如下：';
      }
      l.push({
        value,
        key: i,
        name: '名字名字名字',
        url: 'https://www.google.com?xxx=aaa%&xxx=bbb&cccc=ddd',
        urls: 'https://www.google.com?xxx=aaa%&xxx=bbb&cccc=ddd',
        urlf: 'https://www.google.com?xxx=aaa%&xxx=bbb&cccc=ddd',
        urlg: 'https://www.google.com?xxx=aaa%&xxx=bbb&cccc=ddd',
        urlt: 'https://www.google.com?xxx=aaa%&xxx=bbb&cccc=ddd',
        ursls: 'https://www.google.com?xxx=aaa%&xxx=bbb&cccc=ddd',
        urlfft: 'https://www.google.com?xxx=aaa%&xxx=bbb&cccc=ddd',
        array: [123, 123, {
          a: 123123
        }]
      });
    }
    return l;
  }, []);

  // 数值化元素属性列表.
  const initialPosition = () => {
    const curPosition = list.map((item, index) => ({
      index,
      height: estimateSize,
      top: estimateSize * index,
      bottom: estimateSize * (index + 1)
    }));

    const firstHeight = itemRef.current[0].getBoundingClientRect().height;
    curPosition[0].height = firstHeight;
    curPosition[0].top = 0;
    curPosition[0].bottom = firstHeight;

    for (let i = 1; i < itemRef.current.length; i++) {
      const rect = itemRef.current[i].getBoundingClientRect();
      const { height } = rect;
      curPosition[i].height = height;
      curPosition[i].top = curPosition[i - 1].bottom;
      curPosition[i].bottom = curPosition[i].top + height;
    }

    setPosition(curPosition);
  };

  const updatePositon = (itemStart: number) => {
    // start 已经更新, 列表没有更新, cur = 1. 异步中, cur = 0;
    let cur = 0;

    for (let i = itemStart; i < Math.min(itemStart + visibleNum, dataLength); i++) {
      if (i === 0) {
        cur++;
        continue;
      }
      const rect = itemRef.current[cur].getBoundingClientRect();

      const { height } = rect;
      position[i].height = height;
      position[i].top = position[i - 1].bottom;
      position[i].bottom = position[i].top + height;
      cur++;
    }
    setPosition(([] as Position[]).concat(position));
  }

  const changeHeight = useCallback(() => {
    const num = Math.ceil(window.innerHeight / estimateSize);
    setEnd(start + num);
    setVisibleNum(num);
    setTimeout(() => {
      updatePositon(start);
    }, 0);
  }, []);

  const scroll = () => {
    // 多次取 scrollTop 会可能造成额外的回流.
    const scrollTop = outer?.current?.scrollTop;
    if (scrollTop || scrollTop === 0) {
      // 下面三行, 是固定高度的解决方案.
      // setStart(Math.floor(scrollTop / itemHeight));
      // setEnd(Math.min(dataLength, Math.floor(scrollTop / itemHeight) + visibleNum));
      // setStartOffset(scrollTop - scrollTop % itemHeight);

      // 不固定高度解决方案.
      // !! 注意!因为缓存数据是有顺序的, 这段代码可以用二分法!
      let num = position.find(item => item.bottom > scrollTop)?.index || 0; 

      if (num !== start) {
        setStart(num);
        setTimeout(() => {
          updatePositon(num);
        }, 0);
      }

      setEnd(num + visibleNum);
      // start 更新后, 偏移量也更新.
      setStartOffset(num >= 1 ? position[num - 1].bottom : 0);
      
    }
  };

  useEffect(() => {
    // 不断更新列表高度.
    setListHeight(position?.[position.length - 1]?.bottom);
  }, [position]);

  useEffect(() => {
    setAbove(Math.min(start, buffer * visibleNum));
  }, [start]);

  useEffect(() => {
    setAfter(Math.min(list.length - end, buffer * visibleNum));
  }, [end]);

  useEffect(() => {
    // 初始化要确定容器高度, 每次改变窗口大小都要确定一次.
    changeHeight();
    // 初始化 position 数组, 部分依赖涉及到 state 的更新, 所以需要把他放到异步队列推后.
    setTimeout(() => {
      initialPosition();
    }, 0);
    window.addEventListener('resize', changeHeight);

    return () => {
      window.removeEventListener('resize', changeHeight);
    };
  }, []);



  return (
    <div className="virtual-list" onScroll={scroll} ref={outer}>
      {/* 一个高度为总列表高度的元素, 用于占位形成滚动条. */}
      <div className="inner" ref={inner} style={{ height: listHeight + 'px' }} />
      <div
        className="list-container"
        style={{ transform: `translate3d(0, ${startOffset}px, 0)` }}
      >
        {/* {list.slice(start, end).map((item, index) => ( */}
        {list.slice(start - above, Math.min(end + 1 + after, list.length)).map((item, index) => (
          <div className="item" key={item.key} ref={(ref) => itemRef.current[index] = ref as any}>
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}
