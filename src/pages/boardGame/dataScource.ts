/* eslint-disable comma-dangle */
interface DataType {
  name: string;
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | number[];
  score: number | '-';
  personalScore: number | '-';
  theme: string;
  empathy: string;
  nop: string,
  time: string,
  key?: number
}

// 1轻策, 2中策, 3重策, 4欢乐, 5争执, 6探险.
export const dataSource: DataType[] = [
  {
    name: '璀璨宝石(splendor)',
    type: 1,
    score: 9.5,
    nop: '2-4',
    time: '30-60',
    personalScore: 9,
    theme: '无',
    empathy: '无'
  },
  {
    name: '谍报风云',
    type: 4,
    score: 10,
    nop: '4-8',
    time: '15-35',
    personalScore: 8.5,
    theme: '猜词',
    empathy: '强'
  },
  {
    name: '希望乐园',
    type: 2,
    score: 7.5,
    nop: '3-4(4)',
    time: '90',
    personalScore: 8,
    theme: '经营游乐园',
    empathy: '差'
  },
  {
    name: '工业革命:伯明翰',
    type: 3,
    score: 7,
    nop: '2-4(4)',
    time: '90-120',
    personalScore: 7,
    theme: '工业时代',
    empathy: '中'
  },
  {
    name: '狼人杀',
    type: 5,
    score: 7,
    nop: '7-18(12)',
    time: '120',
    personalScore: 8,
    theme: '身份类',
    empathy: '强'
  },
  {
    name: '山屋惊魂',
    type: 6,
    score: 8.5,
    nop: '4-6',
    time: '60-90',
    personalScore: 7.5,
    theme: '古宅探险',
    empathy: '强'
  },
  {
    name: '怒海求生',
    type: 5,
    score: 7.5,
    nop: '4-8',
    time: '90',
    personalScore: 7.5,
    theme: '海上逃生',
    empathy: '强'
  },
  {
    name: '歌牌',
    type: 4,
    score: 8,
    nop: '2',
    time: '30-45',
    personalScore: 8,
    theme: '听歌抢牌',
    empathy: '中'
  },
  {
    name: '爆炸猫',
    type: 4,
    score: 6.5,
    nop: '3-4',
    time: '15-30',
    personalScore: 4,
    theme: '卡牌',
    empathy: '中'
  },
  {
    name: '害你在心口难开',
    type: 4,
    score: 5,
    nop: '4-8',
    time: '30',
    personalScore: 5,
    theme: '无',
    empathy: '无'
  },
  {
    name: '谁是牛头王',
    type: 4,
    score: 7.5,
    personalScore: 5,
    nop: '3-10',
    time: '10-20',
    theme: '数字吃墩游戏',
    empathy: '强'
  },
  {
    name: 'tiki topple',
    type: 1,
    score: 6,
    nop: '3-4',
    time: '30',
    personalScore: 7,
    theme: '供奉神明',
    empathy: '中'
  },
  {
    name: '三人成筑',
    type: 4,
    score: 8,
    nop: '3或6',
    time: '5-20',
    personalScore: 8,
    theme: '搭建积木',
    empathy: '强'
  },
  {
    name: '疯狂的表情包',
    type: 4,
    score: 8,
    nop: '2-10',
    time: '15',
    personalScore: 6.5,
    theme: '傻逼游戏',
    empathy: '强'
  },
  {
    name: '情书',
    type: 4,
    score: 6.5,
    nop: '2-4',
    time: '5-10',
    personalScore: 4,
    theme: '无',
    empathy: '无'
  },
  {
    name: '你咬我啊',
    type: 4,
    score: 9,
    nop: '5-10',
    time: '30',
    personalScore: 9,
    theme: '动物互殴',
    empathy: '强'
  },
  {
    name: '德国心脏病',
    type: 4,
    score: 8,
    nop: '3-5',
    time: '15',
    personalScore: 6.5,
    theme: '数量反应',
    empathy: '无'
  },
  {
    name: '诈赌巫师',
    type: 4,
    score: 8,
    nop: '4-6',
    time: '30',
    personalScore: 8,
    theme: '赌怪兽输赢',
    empathy: '强'
  },
  {
    name: '箱女',
    type: 6,
    score: 7,
    nop: '3-5',
    time: '60-90',
    personalScore: 8,
    theme: '恐怖古宅',
    empathy: '强'
  },
  {
    name: '一夜终极狼人',
    type: 5,
    score: 6,
    nop: '4-10(6+)',
    time: '30',
    personalScore: 7,
    theme: '身份',
    empathy: '强'
  },
  {
    name: '女巫镇',
    type: 5,
    score: '-',
    nop: '4-12(6+)',
    time: '60',
    personalScore: '-',
    theme: '',
    empathy: ''
  },
  {
    name: '矮人金矿',
    type: 1,
    score: '-',
    nop: '3-11',
    time: '30-60',
    personalScore: '-',
    theme: '',
    empathy: ''
  },
  {
    name: '阿瓦隆',
    type: 5,
    score: 7.5,
    nop: '5-10(7+)',
    time: '90',
    personalScore: 6.5,
    theme: '',
    empathy: ''
  },
  {
    name: '英雄杀',
    type: 4,
    score: 7.5,
    nop: '2-10',
    time: '5-60',
    personalScore: 8,
    theme: '',
    empathy: ''
  },
  {
    name: '富饶之城',
    type: [1, 4, 5],
    score: 7,
    nop: '3-8(6+)',
    time: '60-90',
    personalScore: 6.5,
    theme: '',
    empathy: '富饶之城是一个符合很多人数的桌游, 同时兼顾了许多类型, 玩家在游戏中策略、欢快都能体验到, 还需要与他人沟通。但是他各方面都不突出, 只是一个万金油的选择。'
  },
  {
    name: '全力冲厕',
    type: 4,
    score: 6.5,
    nop: '3-6(4+)',
    time: '30-60',
    personalScore: 6.5,
    theme: '',
    empathy: ''
  },
  {
    name: '风声',
    type: 4,
    score: 8.5,
    nop: '5-10',
    time: '45-75',
    personalScore: 8.5,
    theme: '民国时代, 情报抢夺',
    empathy: '强'
  },
  {
    name: '通缉令',
    type: 4,
    score: 7,
    nop: '3-5',
    time: '15-30',
    personalScore: 8,
    theme: '动作反应',
    empathy: '强'
  },
  {
    name: '三国风云',
    type: 4,
    score: '-',
    nop: '4',
    time: '90',
    personalScore: '-',
    theme: '',
    empathy: ''
  },
  {
    name: '瘟疫危机',
    type: 1,
    score: 6.5,
    nop: '3-4(4)',
    time: '60',
    personalScore: 8,
    theme: '疫情来临, 消灭病毒',
    empathy: '强'
  },
  {
    name: '达芬奇密码',
    type: 1,
    score: 7,
    nop: '2-4',
    time: '5-15',
    personalScore: 5,
    theme: '无',
    empathy: '无'
  },
  {
    name: '地城勇士',
    type: 4,
    score: 8.5,
    nop: '3-5',
    time: '60',
    personalScore: 6.5,
    theme: '地下城探索',
    empathy: '中'
  },
  {
    name: '僵尸商场',
    type: 5,
    score: 8,
    nop: '3-6(4)',
    time: '60',
    personalScore: 7.5,
    theme: '丧尸来袭, 生存欺骗',
    empathy: '强'
  },
  {
    name: '拉斯维加斯',
    type: 4,
    score: 8,
    nop: '3-5(5)',
    time: '30-45',
    personalScore: 6.5,
    theme: '赌博游戏',
    empathy: '强'
  },
  {
    name: '波多黎各',
    type: 2,
    score: 6,
    nop: '3-5(5)',
    time: '90',
    personalScore: 6,
    theme: '中世纪时代, 耕田建造',
    empathy: '中'
  },
  {
    name: '冷战热斗',
    type: 2,
    score: 7,
    nop: '2',
    time: '180',
    personalScore: 7,
    theme: '苏美冷战时期',
    empathy: '中'
  },
  {
    name: '香料之路',
    type: 1,
    score: 6,
    nop: '3-5(4+)',
    time: '30-60',
    personalScore: 6,
    theme: '',
    empathy: ''
  },
  {
    name: '卡坦岛',
    type: [1, 5],
    score: 8,
    nop: '4或6',
    time: '120',
    personalScore: 8,
    theme: '',
    empathy: ''
  },
  {
    name: '马尼拉',
    type: 1,
    score: 7,
    nop: '3-5(4+)',
    time: '40-60',
    personalScore: 6,
    theme: '',
    empathy: ''
  },
  {
    name: '大富翁',
    type: 4,
    score: 8,
    nop: '3-6(4+)',
    time: '120',
    personalScore: 7,
    theme: '不会还没有人知道大富翁吧',
    empathy: ''
  },
  {
    name: '我是大老板',
    type: 5,
    score: '-',
    nop: '3-6(4+)',
    time: '60',
    personalScore: '-',
    theme: '',
    empathy: ''
  },
  {
    name: '卡卡颂',
    type: 1,
    score: 6.5,
    nop: '2-5(3+)',
    time: '60',
    personalScore: 5.5,
    theme: '拼图游戏',
    empathy: ''
  },
  {
    name: '电波同步',
    type: 4,
    score: 7,
    nop: '3-12(4+)',
    time: '30',
    personalScore: 5,
    theme: '',
    empathy: ''
  },
  {
    name: '骆驼大赛',
    type: 4,
    score: 8,
    nop: '4-8(5+)',
    time: '30-45',
    personalScore: 7,
    theme: '押注赛跑的骆驼胜利',
    empathy: '强'
  },
  {
    name: '农场主',
    type: 2,
    score: 7,
    nop: '3-5(5)',
    time: '120',
    personalScore: 7,
    theme: '',
    empathy: ''
  },
  {
    name: '方舟动物园',
    type: 3,
    score: '-',
    nop: '3-4(4)',
    time: '150',
    personalScore: '-',
    theme: '经营动物园',
    empathy: '中'
  },
  {
    name: 'cabo',
    type: 4,
    score: 7.5,
    nop: '2-4(3+)',
    time: '15',
    personalScore: 7,
    theme: '无',
    empathy: '无'
  },
  {
    name: '言下之意',
    type: 4,
    score: 7,
    nop: '4-8(6+)',
    time: '30',
    personalScore: 7,
    theme: '猜词',
    empathy: '强'
  },
  {
    name: '恋爱习题',
    type: 4,
    score: 8,
    nop: '3-8',
    time: '15',
    personalScore: 7.5,
    theme: '观念交流',
    empathy: '强'
  },
  {
    name: '赛马大亨',
    type: 4,
    score: 7.5,
    nop: '3-9(4-5)',
    time: '90',
    personalScore: 7.5,
    theme: '赌马',
    empathy: '非常强'
  },
  {
    name: '行动代号',
    type: 4,
    score: 7.5,
    nop: '4或6或8',
    time: '30',
    personalScore: 7,
    theme: '',
    empathy: ''
  },
  {
    name: '勃艮第城堡',
    type: 2,
    score: 8,
    nop: '3-4(4)',
    time: '90-120',
    personalScore: 8,
    theme: '',
    empathy: ''
  },
  {
    name: 'E卡',
    type: 4,
    score: 6.5,
    nop: '2',
    time: '5-10',
    personalScore: 6.5,
    theme: '心理博弈小游戏',
    empathy: '等人简单来一局'
  },
  {
    name: '七人生还者(狼人杀)',
    type: 4,
    score: 7,
    nop: '7-9',
    time: '30',
    personalScore: 8.5,
    theme: '身份',
    empathy: '强'
  },
  {
    name: '画无语',
    type: 4,
    score: 6.5,
    nop: '3-8(5+)',
    time: '30',
    personalScore: 8,
    theme: '无',
    empathy: '无'
  },
  {
    name: '阿瓦隆2',
    type: 5,
    score: '-',
    nop: '5-10(7+)',
    time: '60',
    personalScore: 7.5,
    theme: '',
    empathy: ''
  },
  {
    name: '战争之匣',
    type: 4,
    score: 8,
    nop: '2或4(4)',
    time: '30',
    personalScore: 8,
    theme: '战旗游戏',
    empathy: '强'
  },
  {
    name: '荒野大弹客',
    type: 4,
    score: 7,
    nop: '2-10',
    time: '45',
    personalScore: 7,
    theme: '',
    empathy: ''
  },
  {
    name: '银河竞逐',
    type: 1,
    score: 7.5,
    nop: '2-4',
    time: '45',
    personalScore: 7.5,
    theme: '',
    empathy: ''
  },
  {
    name: '促织',
    type: 1,
    score: 7,
    nop: '2-4',
    time: '75',
    personalScore: 8,
    theme: '斗蛐蛐',
    empathy: '中'
  },
  {
    name: '脑洞量表',
    type: 4,
    score: 8,
    nop: '5-10',
    time: '15',
    personalScore: 8,
    theme: '',
    empathy: ''
  },
  {
    name: '重塑火星',
    type: 3,
    score: '-',
    nop: '1-5',
    time: '75',
    personalScore: '-',
    theme: '改造火星, 让他成为人类能够生存的地方吧!',
    empathy: ''
  },
  {
    name: '村庄',
    type: 2,
    score: 7,
    nop: '2-4',
    time: '75',
    personalScore: 8,
    theme: '',
    empathy: ''
  },
  {
    name: '喵喵咪啊',
    type: 4,
    score: 8,
    nop: '6-10',
    time: '45',
    personalScore: 9,
    theme: '黑手党藏私货, 内部潜入了侦探的卧底, 卧底能否找出私货呢?',
    empathy: '强'
  },
  {
    name: '腹黑法师',
    type: 4,
    score: 7,
    nop: '3-10',
    time: '30-60',
    personalScore: 8,
    theme: '',
    empathy: ''
  },
  {
    name: '良渚',
    type: 4,
    score: 7,
    nop: '2-4',
    time: '30-60',
    personalScore: '-',
    theme: '还未确定桌游具体内容, 请游玩后补充',
    empathy: ''
  },
  {
    name: '西湖',
    type: 4,
    score: '-',
    nop: '2-4',
    time: '30-60',
    personalScore: '-',
    theme: '还未确定桌游具体内容, 请游玩后补充',
    empathy: ''
  },
];

for (let i = 0; i < dataSource.length; i++) {
  dataSource[i].key = i;
}

// for copy
// {
//   name: '',
//   type: 0,
//   score: 0,
//   personalScore: 0,
//   theme: '',
//   empathy: ''
// },
