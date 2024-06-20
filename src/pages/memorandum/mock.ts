import { PriorityLevel } from './constant';

export const mockCurrentMemoRandumData = [
  {
    task: '容易忘记的事情',
    remainTime: '每天 9:00',
    date: '2024.05.20',
    nextRemainTime: '06.21 9:00',
    priority: PriorityLevel.middle
  },
  {
    task: '容易忘记的事情',
    remainTime: '每 6 个小时',
    date: '2024.06.21',
    nextRemainTime: '06.21 11:00',
    priority: PriorityLevel.low
  },
  {
    task: '容易忘记的事情',
    date: '2024.07.20',
    remainTime: '6小时后, 一小时一次, 共三次',
    nextRemainTime: '06.22 15:15',
    priority: PriorityLevel.heighest
  },
  {
    task: '容易忘记的事情',
    date: '2024.06.27',
    remainTime: '每天 8:00',
    nextRemainTime: '06.21 8:00',
    priority: PriorityLevel.high
  }
];
