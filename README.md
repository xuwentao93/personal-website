personal-website rebuild again.

二次构建接口说明.

一. 时间管理和计划

1. 查询时间和计划.
  显示近两个月的时间管理.(第一个月的第一天, 会从上个月获取时间)下滑滚动显示上个月的时间管理.

  interface SearchTimeAndPlanRequest {
    page: number // 查询的页数.
  }

  interface SearchTimeAndPlanResponse {
    timeList: {
      id,
      level,
      type,
      subtype,
      startTime,
      endTime,
      child,
      date
    }[],
    planList {
      date,
      plan: {
        id,
        level,
        content,
        isFinished,
        reason
      }[]
    }[]
  }

2. 插入时间.
  往当前的时间列表里插入一条时间. (# 页面上要能插入历史时间)

  interface InsertTimeRequest {
    level: 1 | 2 | 3 // 事件等级, 1 表示有意义的, 2 表示普通的, 3 表示浪费.
    type: number // 事件类型
    subtype: string // 事件子类型
    startTime: number // 事件开始时间
    endTime: number // 事件结束时间
    child?: InsertTimeParams // 子事件, 没有 child 属性.
    date: number // 日期
  }

3. 删除时间. 
  interface DeleteTimeRequest {
    id: number // 要删除事件的 id
  }


4. 插入计划.

  interface InsertPlanRequest {
    date: number, 日期
    level: number,
    content: string
  }
