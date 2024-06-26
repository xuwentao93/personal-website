import React from 'react';

// 备忘录类型.
export enum MemorandumTabType {
  // 备忘录
  current = 'current',
  // 历史备忘录
  history = 'histroy',
  // 灵感
  inspiration = 'inspiration'
}

export enum PriorityLevel {
  heighest = 1,
  high = 2,
  middle = 3,
  low = 4
}

export const priorityList = [
  {
    value: PriorityLevel.heighest,
    label: '最高'
  },
  {
    value: PriorityLevel.high,
    label: '高'
  },
  {
    value: PriorityLevel.middle,
    label: '中'
  },
  {
    value: PriorityLevel.low,
    label: '低'
  }
];

export const typeList = [
  {
    value: MemorandumTabType.current,
    label: '备忘录'
  },
  {
    value: MemorandumTabType.inspiration,
    label: '灵感'
  }
]

export const tabList = [
  {
    key: MemorandumTabType.current,
    label: '备忘录'
  },
  {
    key: MemorandumTabType.history,
    label: '历史备忘录'
  },
  {
    key: MemorandumTabType.inspiration,
    label: '灵感'
  }
];

export enum AddTimeType {
  everyDay = 'everyDay',
  timing = 'timing'
}

export enum OperateType {
  finish = 'finish',
  delete = 'delete',
  delay = 'delay',
  hidden = 'hidden'
}

export const timeList: number[] = [];

for (let i = 1; i <= 24; i++) {
  timeList.push(i);
}
