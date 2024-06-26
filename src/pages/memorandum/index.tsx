import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Tabs,
  Table,
  Button,
  Flex,
  Tag,
  Input,
  Select,
  DatePicker,
  Modal,
  TimePicker,
  message
} from 'antd';
import { getMemorandumList, addMemorandum, fetchOperateTask } from '@/api/memorandum';
import {
  tabList,
  MemorandumTabType,
  PriorityLevel,
  priorityList,
  typeList,
  AddTimeType,
  timeList,
  OperateType
} from './constant';
import './index.less';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;

const now = new Date().valueOf();
export default function Memorandum() {
  const [tabKey, setTabKey] = useState(MemorandumTabType.current);

  const [search, setSearch] = useState('');
  const [date, setDate] = useState<[string, string]>(['', '']);
  const [priority, setPriority] = useState();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0)

  const [currentMemorandumData, setCurrentMemorandumData] = useState([]);
  const [historyMemorandumData, setHistoryMemorandumData] = useState([]);
  const [inspirationData, setInspirationData] = useState([]);

  const [showMemorandumModal, setShowMemorandumModal] = useState(false);
  const [type, setType] = useState<MemorandumTabType.current | MemorandumTabType.history>(MemorandumTabType.current);
  const [task, setTask] = useState('');
  const [timeType, setTimeType] = useState<'everyDay' | 'timing'>('everyDay');
  const [everyDayremainTime, setEveryDayRemainTime] = useState<number>(now);
  const [timingremainTime, setTimingRemainTime] = useState<number>(6);
  const [addPriority, setAddPriority] = useState<PriorityLevel>(PriorityLevel.middle);

  useEffect(() => {
    fetchMemorandumList();
  }, [page, search, date, priority]);

  const currentColumns = [
    {
      title: '事情',
      dataIndex: 'task',
      key: 'task'
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: '提醒时间(下次提醒时间)',
      dataIndex: 'remainTime',
      key: 'remainTime'
    },
    {
      title: '下次提醒时间',
      dataIndex: 'nextRemainTime',
      key: 'nextRemainTime'
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render(value: number) {
        const renderByPriority: { [key: string]: JSX.Element } = {
          [PriorityLevel.heighest]: <Tag color="#f00" className="bigger">最高</Tag>,
          [PriorityLevel.high]:  <Tag color="#f60">高</Tag>,
          [PriorityLevel.middle]: <Tag color="#108ee9">中</Tag>,
          [PriorityLevel.low]: <Tag color="#87d068">低</Tag>
        };

        return renderByPriority[`${value}`];
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render(value: undefined, row: any) {
        return (
          <Flex gap="0 12px">
            <Button type="primary" onClick={() => operateTask(row.id, MemorandumTabType.current, OperateType.finish)}>
              完成
            </Button>
            <Button onClick={() => operateTask(row.id, MemorandumTabType.current, OperateType.delay)}>
              延后
            </Button>
            <Button type="primary" danger onClick={() => operateTask(row.id, MemorandumTabType.current, OperateType.delete)}>
              删除
            </Button>
          </Flex>
        );
      }
    }
  ];

  const histroyColumns = [
    {
      title: '事情',
      dataIndex: 'task',
      key: 'task'
    },
    {
      title: '完成时间',
      dataIndex: 'finishTime',
      key: 'finishTime'
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render(value: number) {
        const renderByPriority: { [key: string]: JSX.Element } = {
          [PriorityLevel.heighest]: <Tag color="#f00" className="bigger">最高</Tag>,
          [PriorityLevel.high]:  <Tag color="#f66">高</Tag>,
          [PriorityLevel.middle]: <Tag color="#108ee9">中</Tag>,
          [PriorityLevel.low]: <Tag color="#87d068">低</Tag>
        };

        return renderByPriority[`${value}`];
      }
    },
  ];

  const inspirationColumns = [
    {
      title: '想法',
      dataIndex: 'task',
      key: 'task'
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: '提醒时间(下次提醒时间)',
      dataIndex: 'remainTime',
      key: 'remainTime'
    },
    {
      title: '下次提醒时间',
      dataIndex: 'nextRemainTime',
      key: 'nextRemainTime'
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render(value: undefined, row: any) {
        return (
          <Flex gap="0 12px">
            <Button type="primary" onClick={() => operateTask(row.id, MemorandumTabType.current, OperateType.finish)}>
              完成
            </Button>
            <Button onClick={() => operateTask(row.id, MemorandumTabType.current, OperateType.hidden)}>
              隐藏
            </Button>
            <Button type="primary" danger onClick={() => operateTask(row.id, MemorandumTabType.current, OperateType.delete)}>
              删除
            </Button>
          </Flex>
        );
      }
    }
  ];

  const clear = () => {
    setSearch('');
    setPriority(undefined);
    setDate(['', '']);
  };

  const changeTab = (key: string) => {
    setTabKey(key as MemorandumTabType);
    setPage(1);
    setTimeout(() => {
      fetchMemorandumList(key as MemorandumTabType);
    }, 0);
  }

  const fetchMemorandumList = (key?: MemorandumTabType) => {
    const curKey = key || tabKey;
    getMemorandumList({
      tab: curKey,
      search,
      date,
      page,
      priority
    }).then(res => {
      if (curKey === MemorandumTabType.current) {
        setCurrentMemorandumData(res?.data?.list || []);
        setTotalCount(res?.data?.totalCount || 0);
      }
      if (curKey === MemorandumTabType.history) {
        setHistoryMemorandumData(res?.data?.list || []);
        setTotalCount(res?.data?.totalCount || 0);
      }
      if (curKey === MemorandumTabType.inspiration) {
        setInspirationData(res?.data?.list || []);
        setTotalCount(res?.data?.totalCount || 0);
      }
    });
  };

  const operateTask = (id: number, taskType: MemorandumTabType.current | MemorandumTabType.inspiration, operateType: OperateType) => {
    fetchOperateTask({
      id,
      taskType,
      operateType
    }).then(res => {
      if (res?.data?.success) {
        message.success('操作成功!');
        fetchMemorandumList();
      }
    });
  };


  const addMemorandumClick = () => {
    if (!task) {
      message.warning('未输入 task!');
      return;
    }

    addMemorandum({
      type,
      task,
      timeType,
      remainTime: timeType === 'everyDay' ? everyDayremainTime : timingremainTime,
      priority: addPriority
    }).then(res => {
      if (res?.data?.success) {
        message.success('添加成功!');
        setShowMemorandumModal(false);
      }
    }).catch(err => {
      console.log(err);
      setShowMemorandumModal(false);
    });
  };

  return (
    <div className="personal-momerandum-page">
      <div className="title">备忘录</div>
      <Flex gap="20px 20px" className="margin-20">
        <div className="width-300">
          <Input value={search} placeholder="请输入你想要搜索的内容" onChange={e => setSearch(e.target.value)} />
        </div>
        <Select placeholder="优先级" className="width-100" value={priority} onChange={value => setPriority(value)}>
          {priorityList.map(item => (
            <Option key={item.value} value={item.value}>{item.label}</Option>
          ))}
        </Select>
        <RangePicker onChange={(time, timeString) => setDate(timeString)} />
        <Button type="primary" onClick={clear}>清空</Button>
      </Flex>
      <div className="container">
        <Tabs
          defaultActiveKey={MemorandumTabType.current}
          onChange={changeTab}
          items={tabList}
        />
        <div>
          {tabKey === MemorandumTabType.current && (
            <Table
              columns={currentColumns}
              dataSource={currentMemorandumData}
              pagination={{
                current: page,
                defaultPageSize: 10,
                total: totalCount,
                onChange(page) {
                  setPage(page);
                },
              }}
            />
          )}
          {tabKey === MemorandumTabType.history && (
            <Table
              columns={histroyColumns}
              dataSource={historyMemorandumData}
              pagination={{
                current: page,
                defaultPageSize: 10,
                total: totalCount,
                onChange(page) {
                  setPage(page);
                },
              }}
            />
          )}
          {tabKey === MemorandumTabType.inspiration && (
            <Table
              columns={inspirationColumns}
              dataSource={inspirationData}
              pagination={{
                current: page,
                defaultPageSize: 10,
                total: totalCount,
                onChange(page) {
                  setPage(page);
                },
              }}
            />
          )}
        </div>
      </div>

      <div className="footer">
        <Button type="primary" onClick={() => setShowMemorandumModal(true)}>+添加备忘录</Button>
      </div>

      <Modal
        open={showMemorandumModal}
        onOk={addMemorandumClick}
        onCancel={() => setShowMemorandumModal(false)}
        title="添加备忘录"
      >
        <div className="personal-memorandum-modal-flex-page">
          <div className="title">类型</div>
          <Select
            placeholder="请选择类型"
            className="width-100"
            value={type}
            onChange={value => setType(value)}
          >
            {typeList.map(item => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </div>

        <div className="personal-memorandum-modal-flex-page">
          <div className="title">事情/想法</div>
          <div className="value">
            <Input value={task} onChange={e => setTask(e.target.value)} />
          </div>
        </div>

        <div className="personal-memorandum-modal-flex-page">
          <div className="title">提醒时间</div>
          <div className="value">
            <Select
              placeholder="请选择类型"
              className="width-100"
              onChange={value => setTimeType(value)}
              value={timeType}
            >
              <Option value={AddTimeType.everyDay}>每天</Option>
              <Option value={AddTimeType.timing}>定时</Option>
            </Select>
          </div>
        </div>
        <div className="personal-memorandum-modal-flex-page">
          <div className="title">时间</div>
          <div className="value">
            {timeType === AddTimeType.everyDay && (
              <TimePicker
                value={dayjs(everyDayremainTime)}
                onChange={e => setEveryDayRemainTime(e.valueOf())}
                format="HH:mm"
              />
            )}
            {timeType === AddTimeType.timing && (
              <Select value={timingremainTime} onChange={value => setTimingRemainTime(value)}>
                {timeList.map(item => (
                  <Option key={item} value={item}>{item}</Option>
                ))}
              </Select>
            )}
          </div>
        </div>
        <div className="personal-memorandum-modal-flex-page">
          <div className="title">优先级</div>
          <Select
            placeholder="请选择类型"
            className="width-100"
            onChange={value => setAddPriority(value)}
            value={addPriority}
          >
            {priorityList.map(item => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </div>

      </Modal>
    </div>
  );
}
