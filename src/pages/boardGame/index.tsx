/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Select,
  Tag
} from 'antd';
import { dataSource } from './dataScource';
import './index.less';

interface DataType {
  name: string;
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  score: number | '-';
  personalScore: number | '-';
  theme: string;
  empathy: string;
}

export default function BoardGame() {
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

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

  const pofList = [
    {
      label: '2人',
      value: 2
    },
    {
      label: '3人',
      value: 3
    },
    {
      label: '4人',
      value: 4
    },
    {
      label: '5人',
      value: 5
    },
    {
      label: '6人',
      value: 6
    },
    {
      label: '7人及以上',
      value: 7
    }
  ];

  const timeList = [
    {
      label: '5分钟以内',
      value: 5
    },
    {
      label: '15分钟以内',
      value: 15
    },
    {
      label: '15-30分钟',
      value: 30
    },
    {
      label: '30-60分钟',
      value: 60
    },
    {
      label: '60-90分钟',
      value: 90
    },
    {
      label: '90-120分钟',
      value: 120
    },
    {
      label: '120分钟以上',
      value: 150
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
      render(value: 1 | 2 | 3 | 4 | 5 | 6 | []) {
        if (Array.isArray(value)) {
          return value.map(item => (
            <Tag color={colorMap[item]} key={item} style={{ marginBottom: '6px' }}>{nameMap[item]}</Tag>
          ));
        }
        return <Tag color={colorMap[value]}>{nameMap[value]}</Tag>;
      }
    },
    {
      title: '人数',
      dataIndex: 'nop'
    },
    {
      title: '综合评分',
      dataIndex: 'score',
      sorter: {
        compare: (a: DataType, b: DataType) => (Number(a.score) === Number(b.score)
          ? Number(a.personalScore) - Number(b.personalScore)
          : Number(a.score) - Number(b.score))
      }
    },
    {
      title: '个人评分',
      dataIndex: 'personalScore',
      sorter: {
        compare: (a: DataType, b: DataType) => (Number(a.personalScore) === Number(b.personalScore)
          ? Number(a.score) - Number(b.score)
          : Number(a.personalScore) - Number(b.personalScore))
      }
    }
  ];

  if (!isMobile) {
    columns.push(...[
      {
        title: '预计游戏时长(min)',
        dataIndex: 'time'
      },
      {
        title: '主题',
        dataIndex: 'theme'
      },
      {
        title: '代入感',
        dataIndex: 'empathy'
      }
    ]);
  }

  const [data, setData] = useState(dataSource);
  const [name, setName] = useState('');
  const [type, setType] = useState<any[]>([1, 2, 3, 4, 5, 6, '-']);
  const [score, setScore] = useState(0);
  const [personalScore, setPersonalScore] = useState(0);
  const [nop, setNop] = useState([2, 3, 4, 5, 6, 7]);
  const [time, setTime] = useState([5, 15, 30, 60, 90, 120, 150]);

  useEffect(() => {
    setData(dataSource.filter(item => {
      let checkType = false;
      let checkPof = false;
      let checkTime = false;

      const checkScore = (score >= 7 ? item.score >= score : score === 0 ? true : item.score <= score);
      const checkPersonalScore = personalScore >= 7
        ? item.personalScore >= personalScore
        : personalScore === 0 ? true : item.personalScore <= personalScore;

      // 判断类型筛选.
      if (Array.isArray(item.type)) {
        for (let i = 0; i < item.type.length; i++) {
          if (type.includes(item.type[i])) {
            checkType = true;
            break;
          }
        }
      } else if (type.includes(item.type)) {
        checkType = true;
      }

      // 判断人数筛选.
      const n = item.nop;
      if (n.includes('或')) {
        const nopList = n.split('或');
        for (let i = 0; i < nopList.length; i++) {
          if ((+nopList[i] >= 7 && nop.includes(7)) || nop.includes(+nopList[i])) {
            checkPof = true;
            break;
          }
        }
      } else {
        const nopList = item.nop.indexOf('(') === -1
          ? item.nop.split('-')
          : item.nop.slice(0, item.nop.indexOf('(')).split('-');
        for (let i = 0; i < nop.length; i++) {
          if (nopList.length === 2 && nop[i] >= +nopList[0] && nop[i] <= +nopList[1]) {
            checkPof = true;
            break;
          }
          if (nopList.length === 1 && nop[i] === +nopList[0]) {
            checkPof = true;
            break;
          }
        }
      }

      // 判断时间筛选.
      const timeList = item.time.split('-');
      for (let i = 0; i < timeList.length; i++) {
        const t = +timeList[i];
        if (time.includes(5) && t <= 5) {
          checkTime = true;
          break;
        }
        if (time.includes(15) && t <= 15 && t > 5) {
          checkTime = true;
          break;
        }
        if (time.includes(30) && t <= 30 && t > 15) {
          checkTime = true;
          break;
        }
        if (time.includes(60) && t <= 60 && t > 30) {
          checkTime = true;
          break;
        }
        if (time.includes(90) && t <= 90 && t > 60) {
          checkTime = true;
          break;
        }
        if (time.includes(120) && t <= 120 && t > 90) {
          checkTime = true;
          break;
        }
        if (time.includes(150) && t > 120) {
          checkTime = true;
          break;
        }
      }

      return item.name.includes(name) && checkType && checkScore && checkPof && checkTime && checkPersonalScore;
    }));
  }, [name, score, personalScore, type, nop, time]);

  return (
    <div className="personal-boardgame-page">
      <div className="title">文韬的桌游列表</div>
      <Input
        placeholder="输入桌游名称来搜索特定桌游"
        onChange={e => setName(e.target.value)}
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
            // eslint-disable-next-line max-len
            tagRender={(item: { value: 1 | 2 | 3 | 4 | 5 | 6 }) => <Tag color={colorMap[item.value]}>{nameMap[item.value]}</Tag>}
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
        <div className="select-container">
          <div className="name">人数:</div>
          <Select
            mode="multiple"
            className="select"
            allowClear
            options={pofList}
            onChange={number => setNop(number.length === 0 ? [2, 3, 4, 5, 6, 7] : number)}
          />
        </div>
        <div className="select-container">
          <div className="name">预计游戏时长:</div>
          <Select
            mode="multiple"
            className="select"
            allowClear
            options={timeList}
            onChange={t => setTime(t.length === 0 ? [5, 15, 30, 60, 120, 150] : t)}
          />
        </div>
      </div>
      <div>注:个人评分仅代表个人对游戏的喜好; 综合评分根据游戏时间, 其他玩家喜欢的程度, 对玩家的要求, 游戏复杂程度结合得出。</div>
      <Table columns={columns} dataSource={data} pagination={false} />
      <div className="total">{`当前列表共 ${data.length} 个, 所有桌游总共 ${dataSource.length}个`}</div>
    </div>
  );
}
