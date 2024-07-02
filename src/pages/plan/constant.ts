enum PlanType {
  regular = '定期计划',
  progress = '计划进度',
  record = '记录',
  list = '计划池',
  daily = '固定计划'
}

export const TITLE_LIST: PlanType[] = [
  PlanType.regular, PlanType.progress, PlanType.record, PlanType.list, PlanType.daily
];
