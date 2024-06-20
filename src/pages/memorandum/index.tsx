import * as React from 'react';
import { useState, useEffect } from 'react';
import { Tabs, Table, Button, Flex, Tag, Input, Select, DatePicker, Modal } from 'antd';
import { getMemorandumList } from '@/api/memorandum';
import { tabList, MemorandumTabType, PriorityLevel, priorityList } from './constant';
import { mockCurrentMemoRandumData } from './mock';
import './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Memorandum() {
  const [tabKey, setTabKey] = useState(MemorandumTabType.current);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState<[string, string]>(['', '']);
  const [priority, setPriority] = useState();
  const [page, setPage] = useState(1);
  const [showMemorandumModal, setShowMemorandumModal] = useState(false);

  useEffect(() => {
    getMemorandumList({
      tab: tabKey,
      search,
      date,
      page,
      priority
    }).then(res => {
      console.log(res);
    });

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
            <Table columns={currentColumns} dataSource={mockCurrentMemoRandumData} />
          )}
          {tabKey === MemorandumTabType.history && (
            <Table columns={histroyColumns} />
          )}
          {tabKey === MemorandumTabType.inspiration && (
            <Table columns={inspirationColumns} />
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
      >
        123
      </Modal>
    </div>
  );
}
