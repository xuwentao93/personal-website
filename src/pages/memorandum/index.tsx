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
  TimePicker
} from 'antd';
import { getMemorandumList } from '@/api/memorandum';
import { 
  tabList,
  MemorandumTabType,
  PriorityLevel,
  priorityList,
  typeList,
  AddTimeType,
  timeList
} from './constant';
import {
  mockCurrentMemoRandumData,
  mockHistoryMemoRandumData,
  mockInspirationData
} from './mock';
import './index.less';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Memorandum() {
  const [tabKey, setTabKey] = useState(MemorandumTabType.current);

  const [search, setSearch] = useState('');
  const [date, setDate] = useState<[string, string]>(['', '']);
  const [priority, setPriority] = useState();
  const [page, setPage] = useState(1);

  const [currentMemorandumData, setCurrentMemorandumData] = useState(mockCurrentMemoRandumData);
  const [historyMemorandumData, setHistoryMemorandumData] = useState(mockHistoryMemoRandumData);
  const [inspirationData, setInspirationData] = useState(mockInspirationData);

  const [showMemorandumModal, setShowMemorandumModal] = useState(false);
  const [type, setType] = useState(MemorandumTabType.current);
  const [task, setTask] = useState('');
  const [timeType, setTimeType] = useState('everyDay');
  const [everyDayremainTime, setEveryDayRemainTime] = useState<number>();
  const [timingremainTime, setTimingRemainTime] = useState<number>(6);
  const [addPriority, setAddPriority] = useState<PriorityLevel>(PriorityLevel.middle);

  useEffect(() => {
    // getMemorandumList({
    //   tab: tabKey,
    //   search,
    //   date,
    //   page,
    //   priority
    // }).then(res => {
    //   console.log(res);
    //   // setCurrentMemorandumData(res?.data || []);
    // });

  }, [search, date, priority]);

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
      title: '时间优先级',
      dataIndex: 'priority',
      key: 'priority',
      render(value: number) {
        const renderByPriority: { [key: string]: JSX.Element } = {
          [PriorityLevel.heighest]: <Tag color="#f50" className="bigger">最高</Tag>,
          [PriorityLevel.high]:  <Tag color="#2db7f5">高</Tag>,
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
      render() {
        return (
          <Flex gap="0 12px">
            <Button type="primary">完成</Button>
            <Button>延后</Button>
            <Button type="primary" danger>删除</Button>
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
      title: '事件优先级',
      dataIndex: 'priority',
      key: 'priority'
    }
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
      render() {
        return <div>1</div>;
      }
    }
  ];

  const clear = () => {

  };

  const addMemorandum = () => {
    // api...
  };

  return (
    <div className="personal-momerandum-page">
      <div className="title">备忘录</div>
      <Flex gap="20px 20px" className="margin-20">
        <div className="width-300">
          <Input value={search} placeholder="请输入你想要搜索的内容" onChange={e => setSearch(e.target.value)} />
        </div>
        <Select placeholder="优先级" className="width-100" onChange={value => setPriority(value)}>
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
          onChange={(key: string) => setTabKey(key as MemorandumTabType)}
          items={tabList}
        />
        <div>
          {tabKey === MemorandumTabType.current && (
            <Table columns={currentColumns} dataSource={currentMemorandumData} />
          )}
          {tabKey === MemorandumTabType.history && (
            <Table columns={histroyColumns} dataSource={historyMemorandumData} />
          )}
          {tabKey === MemorandumTabType.inspiration && (
            <Table columns={inspirationColumns} dataSource={inspirationData} />
          )}
        </div>
      </div>

      <div className="footer">
        <Button type="primary" onClick={() => setShowMemorandumModal(true)}>+添加备忘录</Button>
      </div>

      <Modal
        open={showMemorandumModal}
        onOk={addMemorandum}
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
