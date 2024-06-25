// mock.js
import { PriorityLevel } from '@/pages/memorandum/constant';
import Mock from 'mockjs';

Mock.mock('http://www.wentaowulue.com:8080/memorandum/list?tab=current&search=&date[]=&date[]=&page=1', 'get', {
  status: 200,
  message: 'success',
  data: {
    success: true,
    page: 1,
    totalCount: 30,
    list: [
      {
        task: '这是第一页',
        remainTime: '每天 9:00',
        date: '2024.05.20',
        nextRemainTime: '06.21 9:00',
        priority: PriorityLevel.middle,
        key: '1'
      },
      {
        task: '容易忘记的事情',
        remainTime: '每 6 个小时',
        date: '2024.06.21',
        nextRemainTime: '06.21 11:00',
        priority: PriorityLevel.low,
        key: '2'
      },
      {
        task: '容易忘记的事情3',
        date: '2024.07.20',
        remainTime: '6小时后, 一小时一次, 共三次',
        nextRemainTime: '06.22 15:15',
        priority: PriorityLevel.heighest,
        key: '3'
      },
      {
        task: '容易忘记的事情4',
        date: '2024.06.27',
        remainTime: '每天 8:00',
        nextRemainTime: '06.21 8:00',
        priority: PriorityLevel.high,
        key: '4'
      },
      {
        task: '容易忘记的事情',
        remainTime: '每天 9:00',
        date: '2024.05.20',
        nextRemainTime: '06.21 9:00',
        priority: PriorityLevel.middle,
        key: '5'
      },
      {
        task: '容易忘记的事情',
        remainTime: '每 6 个小时',
        date: '2024.06.21',
        nextRemainTime: '06.21 11:00',
        priority: PriorityLevel.low,
        key: '6'
      },
      {
        task: '容易忘记的事情3',
        date: '2024.07.20',
        remainTime: '6小时后, 一小时一次, 共三次',
        nextRemainTime: '06.22 15:15',
        priority: PriorityLevel.heighest,
        key: '7'
      },
      {
        task: '容易忘记的事情4',
        date: '2024.06.27',
        remainTime: '每天 8:00',
        nextRemainTime: '06.21 8:00',
        priority: PriorityLevel.high,
        key: '8'
      },
      {
        task: '容易忘记的事情',
        remainTime: '每天 9:00',
        date: '2024.05.20',
        nextRemainTime: '06.21 9:00',
        priority: PriorityLevel.middle,
        key: '9'
      },
      {
        task: '容易忘记的事情',
        remainTime: '每 6 个小时',
        date: '2024.06.21',
        nextRemainTime: '06.21 11:00',
        priority: PriorityLevel.low,
        key: '10'
      },
    ]
  }
});

Mock.mock('http://www.wentaowulue.com:8080/memorandum/list?tab=current&search=&date[]=&date[]=&page=2', 'get', {
  status: 200,
  message: 'success',
  data: {
    success: true,
    page: 2,
    totalCount: 30,
    list: [
      {
        task: '这是第二页',
        date: '2024.07.20',
        remainTime: '6小时后, 一小时一次, 共三次',
        nextRemainTime: '06.22 15:15',
        priority: PriorityLevel.high,
        key: '11'
      },
      {
        task: '哈哈哈哈',
        date: '2024.06.27',
        remainTime: '每天 8:00',
        nextRemainTime: '06.21 8:00',
        priority: PriorityLevel.heighest,
        key: '12'
      },
      {
        task: '啊啊啊啊',
        remainTime: '每天 9:00',
        date: '2024.05.20',
        nextRemainTime: '06.21 9:00',
        priority: PriorityLevel.middle,
        key: '13'
      },
      {
        task: '容易忘记的事情',
        remainTime: '每 6 个小时',
        date: '2024.06.21',
        nextRemainTime: '06.21 11:00',
        priority: PriorityLevel.low,
        key: '14'
      },
      {
        task: '容易忘记的事情3',
        date: '2024.07.20',
        remainTime: '6小时后, 一小时一次, 共三次',
        nextRemainTime: '06.22 15:15',
        priority: PriorityLevel.heighest,
        key: '15'
      },
      {
        task: '容易忘记的事情4',
        date: '2024.06.27',
        remainTime: '每天 8:00',
        nextRemainTime: '06.21 8:00',
        priority: PriorityLevel.high,
        key: '411'
      },
      {
        task: '容易忘记的事情',
        remainTime: '每天 9:00',
        date: '2024.05.20',
        nextRemainTime: '06.21 9:00',
        priority: PriorityLevel.middle,
        key: '133'
      },
      {
        task: '容易忘记的事情',
        remainTime: '每 6 个小时',
        date: '2024.06.21',
        nextRemainTime: '06.21 11:00',
        priority: PriorityLevel.low,
        key: '244'
      },
      {
        task: '容易忘记的事情3',
        date: '2024.07.20',
        remainTime: '6小时后, 一小时一次, 共三次',
        nextRemainTime: '06.22 15:15',
        priority: PriorityLevel.heighest,
        key: '343'
      },
      {
        task: '容易忘记的事情4',
        date: '2024.06.27',
        remainTime: '每天 8:00',
        nextRemainTime: '06.21 8:00',
        priority: PriorityLevel.high,
        key: '2434'
      }
    ]
  }
});

Mock.mock('http://www.wentaowulue.com:8080/memorandum/list?tab=current&search=&date[]=&date[]=&page=3', 'get', {
  status: 200,
  message: 'success',
  data: {
    success: true,
    page: 2,
    totalCount: 30,
    list: [
      {
        task: '这是第三页',
        date: '2024.07.20',
        remainTime: '6小时后, 一小时一次, 共三次',
        nextRemainTime: '06.22 15:15',
        priority: PriorityLevel.high,
        key: '11'
      },
      {
        task: '哈哈哈哈',
        date: '2024.06.27',
        remainTime: '每天 8:00',
        nextRemainTime: '06.21 8:00',
        priority: PriorityLevel.heighest,
        key: '12'
      },
      {
        task: '啊啊啊啊',
        remainTime: '每天 9:00',
        date: '2024.05.20',
        nextRemainTime: '06.21 9:00',
        priority: PriorityLevel.middle,
        key: '13'
      },
      {
        task: '容易忘记的事情4',
        date: '2024.06.27',
        remainTime: '每天 8:00',
        nextRemainTime: '06.21 8:00',
        priority: PriorityLevel.high,
        key: '411'
      },
      {
        task: '容易忘记的事情',
        remainTime: '每天 9:00',
        date: '2024.05.20',
        nextRemainTime: '06.21 9:00',
        priority: PriorityLevel.middle,
        key: '133'
      },
      {
        task: '容易忘记的事情',
        remainTime: '每 6 个小时',
        date: '2024.06.21',
        nextRemainTime: '06.21 11:00',
        priority: PriorityLevel.low,
        key: '244'
      },
      {
        task: '容易忘记的事情3',
        date: '2024.07.20',
        remainTime: '6小时后, 一小时一次, 共三次',
        nextRemainTime: '06.22 15:15',
        priority: PriorityLevel.heighest,
        key: '343'
      },
      {
        task: '容易忘记的事情4',
        date: '2024.06.27',
        remainTime: '每天 8:00',
        nextRemainTime: '06.21 8:00',
        priority: PriorityLevel.high,
        key: '2434'
      }
    ]
  }
});

Mock.mock('http://www.wentaowulue.com:8080/memorandum/list?tab=histroy&search=&date[]=&date[]=&page=1', 'get', {
  status: 200,
  message: 'success',
  data: {
    success: true,
    page: 2,
    totalCount: 20,
    list: [
      {
        task: '历史第一页',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.middle,
        key: '1'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.low,
        key: '2'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.heighest,
        key: '3'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.high,
        key: '4'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.middle,
        key: '5'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.low,
        key: '6'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.heighest,
        key: '7'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.high,
        key: '8'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.middle,
        key: '9'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.low,
        key: '10'
      }
    ]
  }
});

Mock.mock('http://www.wentaowulue.com:8080/memorandum/list?tab=histroy&search=&date[]=&date[]=&page=2', 'get', {
  status: 200,
  message: 'success',
  data: {
    success: true,
    page: 2,
    totalCount: 20,
    list: [
      {
        task: '历史第一页',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.middle,
        key: '1'
      },
      {
        task: '历史第二页',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.low,
        key: '2'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.heighest,
        key: '3'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.high,
        key: '4'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.middle,
        key: '5'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.low,
        key: '6'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.heighest,
        key: '7'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.high,
        key: '8'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.middle,
        key: '9'
      },
      {
        task: '容易忘记的事情',
        finishTime: '2024.07.20 8:00',
        priority: PriorityLevel.low,
        key: '10'
      }
    ]
  }
});

Mock.mock('http://www.wentaowulue.com:8080/memorandum/list?tab=inspiration&search=&date[]=&date[]=&page=1', 'get', {
  status: 200,
  message: 'success',
  data: {
    success: true,
    page: 2,
    totalCount: 4,
    list: [
      {
        task: '容易忘记的事情',
        remainTime: '每天 9:00',
        date: '2024.05.20',
        nextRemainTime: '06.21 9:00',
        key: '1'
      },
      {
        task: '容易忘记的事情',
        remainTime: '每 6 个小时',
        date: '2024.06.21',
        nextRemainTime: '06.21 11:00',
        key: '2'
      },
      {
        task: '容易忘记的事情',
        date: '2024.07.20',
        remainTime: '6小时后, 一小时一次, 共三次',
        nextRemainTime: '06.22 15:15',
        key: '3'
      },
      {
        task: '容易忘记的事情',
        date: '2024.06.27',
        remainTime: '每天 8:00',
        nextRemainTime: '06.21 8:00',
        key: '4'
      }
    ]
  }
});
