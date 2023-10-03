/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Select,
  Tag
} from 'antd';
import './index.less';

interface DataType {
  name: string;
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  score: number;
  personalScore: number;
  brief: string;
  evaluate: string;
}

export default function BoardGame() {
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  const typeList = [
    {
      label: '轻度策略',
      value: 1
    },
    {
      label: '中度策略',
      value: 2
    },
    {
      label: '重度策略',
      value: 3
    },
    {
      label: '欢乐',
      value: 4
    },
    {
      label: '争执',
      value: 5
    },
    {
      label: '探险',
      value: 6
    }
  ];

  const scoreList = [
    {
      label: '6分及以下',
      value: 6
    },
    {
      label: '7分及以上',
      value: 7
    },
    {
      label: '8分及以上',
      value: 8
    },
    {
      label: '9分及以上',
      value: 9
    }
  ];

  const personalScoreList = [
    {
      label: '6分及以下',
      value: 6
    },
    {
      label: '7分及以上',
      value: 7
    },
    {
      label: '8分及以上',
      value: 8
    },
    {
      label: '9分及以上',
      value: 9
    }
  ];

  const columns: any[] = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '类别',
      dataIndex: 'type',
      width: 100,
      render(value: 1 | 2 | 3 | 4 | 5 | 6) {
        const colorMap = {
          1: 'success',
          2: 'processing',
          3: 'error',
          4: 'warning',
          5: 'default',
          6: '#333'
        };
        const nameMap = {
          1: '轻度策略',
          2: '中度策略',
          3: '重度策略',
          4: '欢乐',
          5: '争执',
          6: '探险'
        };

        return <Tag color={colorMap[value]}>{nameMap[value]}</Tag>;
      }
    },
    {
      title: '综合评分',
      dataIndex: 'score',
      sorter: {
        compare: (a: DataType, b: DataType) => a.score - b.score
      }
    },
    {
      title: '个人评分',
      dataIndex: 'personalScore',
      sorter: {
        compare: (a: DataType, b: DataType) => a.personalScore - b.personalScore
      }
    }
  ];

  if (!isMobile) {
    columns.push(...[{
      title: '简介',
      dataIndex: 'brief'
    },
    {
      title: '评价',
      dataIndex: 'evaluate'
    }]);
  }

  // 1轻策, 2中策, 3重策, 4欢乐, 5争执, 6探险.
  const dataSource: DataType[] = [
    {
      name: '璀璨宝石(splendor)',
      type: 1,
      score: 9.5,
      personalScore: 9,
      brief: '一个非常适合新手游玩的策略类游戏(测试,之后请重写)',
      evaluate: '哈哈哈哈'
    },
    {
      name: '谍报风云',
      type: 4,
      score: 10,
      personalScore: 8.5,
      brief: 'abc123',
      evaluate: ''
    },
    {
      name: '希望乐园',
      type: 2,
      score: 7.5,
      personalScore: 8,
      brief: '方法',
      evaluate: '啊'
    },
    {
      name: '工业革命:伯明翰',
      type: 3,
      score: 7,
      personalScore: 7,
      brief: '',
      evaluate: ''
    },
    {
      name: '狼人杀',
      type: 5,
      score: 0,
      personalScore: 0,
      brief: '',
      evaluate: ''
    },
    {
      name: '山屋惊魂',
      type: 6,
      score: 0,
      personalScore: 0,
      brief: '',
      evaluate: ''
    },
    {
      name: '',
      type: 0,
      score: 0,
      personalScore: 0,
      brief: '',
      evaluate: ''
    },
    {
      name: '',
      type: 0,
      score: 0,
      personalScore: 0,
      brief: '',
      evaluate: ''
    },
    {
      name: '',
      type: 0,
      score: 0,
      personalScore: 0,
      brief: '',
      evaluate: ''
    },
    {
      name: '',
      type: 0,
      score: 0,
      personalScore: 0,
      brief: '',
      evaluate: ''
    },
    {
      name: '',
      type: 0,
      score: 0,
      personalScore: 0,
      brief: '',
      evaluate: ''
    },
    {
      name: '',
      type: 0,
      score: 0,
      personalScore: 0,
      brief: '',
      evaluate: ''
    },
    {
      name: '',
      type: 0,
      score: 0,
      personalScore: 0,
      brief: '',
      evaluate: ''
    }
  ];

  const [data, setData] = useState(dataSource);
  const [name, setName] = useState('');
  const [type, setType] = useState([1, 2, 3, 4, 5, 6]);
  const [score, setScore] = useState(0);
  const [personalScore, setPersonalScore] = useState(0);

  useEffect(() => {
    setData(dataSource.filter(item => {
      // console.log(type);
      // console.log(type.includes(item.type));
      // console.log((score >= 7 ? item.score >= score : score === 0 ? true : item.score <= score));
      return item.name.includes(name)
        && type.includes(item.type)
        && (score >= 7 ? item.score >= score : score === 0 ? true : item.score <= score)
        // eslint-disable-next-line max-len
        && (personalScore >= 7 ? item.personalScore >= personalScore : personalScore === 0 ? true : item.personalScore <= personalScore);
    }));
  }, [name, score, personalScore, type]);

  return (
    <div className="personal-boardgame-page">
      <div className="title">桌游列表</div>
      <Input
        placeholder="输入桌游名称来搜索特定桌游"
      />
      <div className="select-list">
        <div className="select-container">
          <div className="name">类别:</div>
          <Select
            mode="multiple"
            className="select"
            allowClear
            options={typeList}
            onChange={type => setType(type.length === 0 ? [1, 2, 3, 4, 5, 6] : type)}
          />
        </div>
        <div className="select-container">
          <div className="name">综合评分</div>
          <Select
            className="select"
            allowClear
            options={scoreList}
            onChange={score => setScore(score || 0)}
          />
        </div>
        <div className="select-container">
          <div className="name">个人评分:</div>
          <Select
            className="select"
            allowClear
            options={personalScoreList}
            onChange={score => setPersonalScore(score || 0)}
          />
        </div>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
