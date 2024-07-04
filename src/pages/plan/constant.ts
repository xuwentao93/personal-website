export enum PlanType {
  regular = '定期计划',
  progress = '计划进度',
  record = '记录',
  list = '计划池',
  daily = '固定计划'
}

export const TITLE_LIST: PlanType[] = [
  PlanType.regular, PlanType.progress, PlanType.record, PlanType.list, PlanType.daily
];

export enum RegularTabType {
  day = 'day',
  week = 'week',
  month = 'month'
};

export enum OperateType {
  finish = 'finish',
  notFinish = 'notFinish'
};

export const REGULAR_TAB_LIST = [
  {
    key: RegularTabType.day,
    label: '每日计划'
  },
  {
    key: RegularTabType.week,
    label: '每周计划'
  },
  {
    key: RegularTabType.month,
    label: '每月计划'
  },
];

