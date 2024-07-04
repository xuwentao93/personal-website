import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Tabs,
  Table,
  DatePicker,
  Modal,
  message,
  Button,
  Flex,
  Input
} from 'antd';
import dayjs from 'dayjs';
import {
  RegularTabType,
  REGULAR_TAB_LIST,
  OperateType
} from '../../constant';
import { getRegularPlanList } from '@/api/plan';
import './index.less';

console.log(dayjs().valueOf());
console.log(dayjs().add(-2, 'day').valueOf());

export default function Reqular() {
  const [tabKey, setTabKey] = useState(RegularTabType.day);
  const [dailyData, setDailyData] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [monthData, setMonthData] = useState([]);

  const [page, setPage] = useState(1);
  // 不用 totalCount 考虑捕获异常避免接口挂了后面的东西拉不出来.
  const [totalCount, setTotalCount] = useState(0);

  const [showAddRegularPlan, setShowAddRegularPlan] = useState(false);

  useEffect(() => {
    fetchReqularPlanList();
  }, [page, tabKey]);

  const column = [
    {
      title: '计划',
      dataIndex: 'plan',
      key: 'plan',
      render(value: string, row: any, index: number) {
        return `${index+ 1}. ${value}`;
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 240,
      render(value: undefined, row: any) {
        return (
          <Flex gap="0 12px">
            <Button type="primary" onClick={() => operateTask(row.id, OperateType.finish)}>
              完成
            </Button>
            <Button type="primary" danger onClick={() => operateTask(row.id, OperateType.notFinish)}>
              未完成
            </Button>
          </Flex>
        );
      }
    },
  ]

  const changeTab = () => {

  };

  const fetchReqularPlanList = () => {
    getRegularPlanList({
      page,
      tab: tabKey
    }).then(res => {
      if (tabKey === RegularTabType.day) {
        setDailyData(res?.data?.data);
      }
      else if (tabKey === RegularTabType.week) {
        setWeekData(res?.data?.data);
      }
      else if (tabKey === RegularTabType.month) {
        setMonthData(res?.data?.data);
      }
    });
  };

  const setTime = (time: number) => {
    const day = dayjs(time);
    const weekDay = day.day();
    const weekDayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    if (day.isSame(dayjs(), 'day')) {
      return day.format(`MM.DD ${weekDayMap[weekDay]}(今天)`);
    }
    if (day.isSame(dayjs().subtract(1, 'day'), 'day')) {
      return day.format(`MM.DD ${weekDayMap[weekDay]}(昨天)`);
    }
    return day.format(`MM.DD ${weekDayMap[weekDay]}`);
  }

  const operateTask = (id: string, type: OperateType) => {
    console.log(id, tabKey, type);
  };

  const addRegularPlanClick = () => {};

  return (
    <div className="personal-plan-reqular-page">
      <Tabs
        defaultActiveKey={RegularTabType.day}
        onChange={changeTab}
        items={REGULAR_TAB_LIST}
      />
        {tabKey === RegularTabType.day && (
          <div className="table-list-container">
            {dailyData.map((item, i) => (
              <div>
                <div className="date">{setTime(item.date)}</div>
                <Table
                  columns={column}
                  className="table"
                  dataSource={dailyData[i].list}
                  pagination={false}
                />
              </div>
            ))}
          </div>
        )}
        {tabKey === RegularTabType.week && (
          <Table
            columns={column}
            dataSource={weekData}
            pagination={false}
          />
        )}
        {tabKey === RegularTabType.month && (
          <Table
            columns={column}
            dataSource={monthData}
            pagination={false}
          />
        )}
      <div className="footer">
        <Button type="primary" onClick={() => setShowAddRegularPlan(true)}>+添加计划</Button>
      </div>

      <Modal
        open={showAddRegularPlan}
        onOk={addRegularPlanClick}
        onCancel={() => setShowAddRegularPlan(false)}
        title="添加计划"
      >
      </Modal>
    </div>
  );
}
