/* eslint-disable comma-dangle */
interface DataType {
  name: string;
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | number[];
  score: number | '-';
  personalScore: number | '-';
  brief: string;
  evaluate: string;
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
    brief: '通过收集宝石购买卡牌获取分数的策略游戏',
    evaluate: '神作!非常适合新手入坑, 同时也有相当的耐玩性。新手往往会体验到慢慢成长的快乐, 老手则会在最快速刷分的竞技中获得成就感。'
  },
  {
    name: '谍报风云',
    type: 4,
    score: 10,
    nop: '4-8',
    time: '15-35',
    personalScore: 8.5,
    brief: '合作猜词, 在猜对队友词语的同时不让对手猜对, 同时又要猜对对手的词语',
    evaluate: '神作!推新第一名!游玩好评率 100%!这是一个能让非常内向的人大胆开口说话的游戏。游戏流程简单, 不具备特别高的耐玩性。'
  },
  {
    name: '希望乐园',
    type: 2,
    score: 7.5,
    nop: '3-4(4)',
    time: '90',
    personalScore: 8,
    brief: '工人放置类策略游戏, 通过经营自己的游乐园来获取分数。',
    evaluate: '在中等策略中算是简单的, 很普通的一个中策。'
  },
  {
    name: '工业革命:伯明翰',
    type: 3,
    score: 7,
    nop: '2-4(4)',
    time: '90-120',
    personalScore: 7,
    brief: '',
    evaluate: ''
  },
  {
    name: '狼人杀',
    type: 5,
    score: 7,
    nop: '7-18(12)',
    time: '120',
    personalScore: 8,
    brief: '',
    evaluate: ''
  },
  {
    name: '山屋惊魂',
    type: 6,
    score: 8.5,
    nop: '4-6',
    time: '60-90',
    personalScore: 7.5,
    brief: '在一个古老的幽宅中探险, 玩家会体验到各种各样未知的事情带来的惊喜。',
    evaluate: '探索趣味很强, 同时除奸阶段剧本让玩家的代入感更强。可惜第一流程的重复性太高, 在阅读的事件都是相同的时候会变得无趣。'
  },
  {
    name: '怒海求生',
    type: 5,
    score: 7.5,
    nop: '4-8',
    time: '90',
    personalScore: 7.5,
    brief: '',
    evaluate: ''
  },
  {
    name: '歌牌',
    type: 4,
    score: 8,
    nop: '2',
    time: '30-45',
    personalScore: 8,
    brief: '',
    evaluate: ''
  },
  {
    name: '爆炸猫',
    type: 4,
    score: 6.5,
    nop: '3-4',
    time: '15-30',
    personalScore: 4,
    brief: '',
    evaluate: ''
  },
  {
    name: '害你在心口难开',
    type: 4,
    score: 5,
    nop: '4-8',
    time: '30',
    personalScore: 5,
    brief: '让对方说出或做出头上卡牌的事',
    evaluate: '很容易让场子变闷, 玩家又要大胆的说才能有趣, 但是这个度也非常难把握, 如果过度的话也会变得无趣。'
  },
  {
    name: '谁是牛头王',
    type: 4,
    score: 7.5,
    personalScore: 5,
    nop: '3-10',
    time: '10-20',
    brief: '数字吃墩游戏',
    evaluate: '简单又欢快'
  },
  {
    name: 'tiki topple',
    type: 1,
    score: 6,
    nop: '3-4',
    time: '30',
    personalScore: 7,
    brief: '讲自己的神明推向顶端, 获取游戏的分数',
    evaluate: '作为开场热身还不错, 虽然重复, 但是个人还没腻'
  },
  {
    name: '三人成筑',
    type: 4,
    score: 8,
    nop: '3或6',
    time: '5-20',
    personalScore: 8,
    brief: '根据图示搭建积木, 一个人来摆, 一个人来用嘴描述, 另一个人知道积木搭建的样子, 但是他只能用手比划。',
    evaluate: ''
  },
  {
    name: '疯狂的表情包',
    type: 4,
    score: 8,
    nop: '2-10',
    time: '15',
    personalScore: 6.5,
    brief: '傻逼游戏',
    evaluate: '表情包的问题在于文字冗余性太多, 但是整体的卡牌非常蠢, 一些时候会让你笑的停不下来'
  },
  {
    name: '情书',
    type: 4,
    score: 6.5,
    nop: '2-4',
    time: '5-10',
    personalScore: 4,
    brief: '',
    evaluate: ''
  },
  {
    name: '你咬我啊',
    type: 4,
    score: 9,
    nop: '5-10',
    time: '30',
    personalScore: 9,
    brief: '通过单挑、群架消灭别的小动物来获得分数',
    evaluate: '神作!每次玩必笑!和谍报风云比, 他可能不能带动内向人群的兴奋劲,暖场效果却更好。他的耐玩性也十足,游戏也简单。'
  },
  {
    name: '德国心脏病',
    type: 4,
    score: 8,
    nop: '3-5',
    time: '15',
    personalScore: 6.5,
    brief: '',
    evaluate: ''
  },
  {
    name: '诈赌巫师',
    type: 4,
    score: 8,
    nop: '4-6',
    time: '30',
    personalScore: 8,
    brief: '我们是一群巫师,现在底下赌场里面有一群怪物在决斗,我们要押注哪个怪物会获胜,然后在暗中施法让自己押注的怪物获胜。',
    evaluate: '整体上还可以, 玩家会有代入感, 耐玩性略有不足, 欢乐的效果也挺高的, 但和顶尖还是有一点小差距。'
  },
  {
    name: '箱女',
    type: 6,
    score: 7,
    nop: '3-5',
    time: '60-90',
    personalScore: 8,
    brief: '在一个鬼宅里面, 藏着一个恐怖的箱女, 玩家要想办法超度箱女的亡魂, 或者从这个鬼宅里面跑出去...',
    evaluate: '如果能够营造恐怖的气氛增加箱女的代入感, 那体验会是大大增加, 否则就是一个很普通的游戏。'
  },
  {
    name: '一夜终极狼人',
    type: 5,
    score: 6,
    nop: '4-10(6+)',
    time: '30',
    personalScore: 7,
    brief: '',
    evaluate: ''
  },
  {
    name: '女巫镇',
    type: 5,
    score: '-',
    nop: '4-12(6+)',
    time: '60',
    personalScore: '-',
    brief: '',
    evaluate: ''
  },
  {
    name: '矮人金矿',
    type: 1,
    score: '-',
    nop: '3-11',
    time: '30-60',
    personalScore: '-',
    brief: '',
    evaluate: ''
  },
  {
    name: '阿瓦隆',
    type: 5,
    score: 7.5,
    nop: '5-10(7+)',
    time: '90',
    personalScore: 6.5,
    brief: '',
    evaluate: ''
  },
  {
    name: '英雄杀',
    type: 4,
    score: 7.5,
    nop: '2-10',
    time: '5-60',
    personalScore: 8,
    brief: '',
    evaluate: ''
  },
  {
    name: '富饶之城',
    type: [1, 4, 5],
    score: 7,
    nop: '3-8(6+)',
    time: '60-90',
    personalScore: 6.5,
    brief: '',
    evaluate: '富饶之城是一个符合很多人数的桌游, 同时兼顾了许多类型, 玩家在游戏中策略、欢快都能体验到, 还需要与他人沟通。但是他各方面都不突出, 只是一个万金油的选择。'
  },
  {
    name: '全力冲厕',
    type: 4,
    score: 6.5,
    nop: '3-6(4+)',
    time: '30-60',
    personalScore: 6.5,
    brief: '',
    evaluate: ''
  },
  {
    name: '风声',
    type: 4,
    score: 8.5,
    nop: '5-10',
    time: '45-75',
    personalScore: 8.5,
    brief: '在危机四伏的年代, 我们要传递情报给我们的队友, 同时又要传递错误的情报给对方...',
    evaluate: '风声是一个相当欢乐的游戏, 基本的机制决定了玩家在大多时候都不会太无聊, 是能让人全程投入的游戏。'
  },
  {
    name: '通缉令',
    type: 4,
    score: 7,
    nop: '3-5',
    time: '15-30',
    personalScore: 8,
    brief: '反应类游戏, 根据卡牌做出相应的动作, 同时错误的卡牌不能做任何动作',
    evaluate: '通缉令是我一个非常喜欢的游戏, 同时又相当耐玩, 因为里面的错误卡牌和正确的很像, 经常会有人反应不过来, 让人捧腹大笑'
  },
  {
    name: '三国风云',
    type: 4,
    score: '-',
    nop: '4',
    time: '90',
    personalScore: '-',
    brief: '',
    evaluate: ''
  },
  {
    name: '瘟疫危机',
    type: 1,
    score: 6.5,
    nop: '3-4(4)',
    time: '60',
    personalScore: 8,
    brief: '我们是一群科学家, 现在地球出现了四种病毒, 我们要研发出疫苗, 让病毒灭绝, 同时不能在这期间让病毒扩散的难以解决...',
    evaluate: '瘟疫危机是一款合作策略类的游戏, 他的代入感还不错, 但是可能会遇到一个人主要负责逻辑的情况, 其他玩家没有体验。同时由于没有竞技感, 也会让一批玩家讨厌他。'
  },
  {
    name: '达芬奇密码',
    type: 1,
    score: 7,
    nop: '2-4',
    time: '5-15',
    personalScore: 5,
    brief: '',
    evaluate: '没事干等人的时候随便玩一下'
  },
  {
    name: '地城勇士',
    type: 4,
    score: 8.5,
    nop: '3-5',
    time: '60',
    personalScore: 6.5,
    brief: '一群勇士进入到地下城, 在这里进行一番探索, 消灭怪物, 获得金钱和奖励...',
    evaluate: '这是一个看的人和玩的人都非常欢快的游戏, 哈哈哈哈哈哈哈哈!'
  },
  {
    name: '僵尸商场',
    type: 5,
    score: 8,
    nop: '3-6(4)',
    time: '60',
    personalScore: 7.5,
    brief: '',
    evaluate: ''
  },
  {
    name: '拉斯维加斯',
    type: 4,
    score: 8,
    nop: '3-5(5)',
    time: '30-45',
    personalScore: 6.5,
    brief: '赌博游戏, 赌就完事了!',
    evaluate: ''
  },
  {
    name: '波多黎各',
    type: 2,
    score: 6,
    nop: '3-5(5)',
    time: '90',
    personalScore: 6,
    brief: '',
    evaluate: ''
  },
  {
    name: '冷战热斗',
    type: 2,
    score: 7,
    nop: '2',
    time: '180',
    personalScore: 7,
    brief: '',
    evaluate: ''
  },
  {
    name: '香料之路',
    type: 1,
    score: 6,
    nop: '3-5(4+)',
    time: '30-60',
    personalScore: 6,
    brief: '',
    evaluate: ''
  },
  {
    name: '卡坦岛',
    type: [1, 5],
    score: 8,
    nop: '4或6',
    time: '120',
    personalScore: 8,
    brief: '在拥挤的卡坦岛上, 我们要利用自己的资源交换别人的资源来发展自身, 获得更高的分数',
    evaluate: '作为曾经让我痴迷的桌游, 卡坦岛一度也让想当的玩家喜欢, 作为争执类, 还是会不符合部分玩家的胃口, 同时可能会带来一定的不良情绪。'
  },
  {
    name: '马尼拉',
    type: 1,
    score: 7,
    nop: '3-5(4+)',
    time: '40-60',
    personalScore: 6,
    brief: '',
    evaluate: ''
  },
  {
    name: '大富翁',
    type: 4,
    score: 8,
    nop: '3-6(4+)',
    time: '120',
    personalScore: 7,
    brief: '不会还没有人知道大富翁吧',
    evaluate: ''
  },
  {
    name: '我是大老板',
    type: 5,
    score: '-',
    nop: '3-6(4+)',
    time: '60',
    personalScore: '-',
    brief: '',
    evaluate: ''
  },
  {
    name: '卡卡颂',
    type: 1,
    score: 6.5,
    nop: '2-5(3+)',
    time: '60',
    personalScore: 5.5,
    brief: '拼图游戏',
    evaluate: ''
  },
  {
    name: '电波同步',
    type: 4,
    score: 7,
    nop: '3-12(4+)',
    time: '30',
    personalScore: 5,
    brief: '',
    evaluate: ''
  },
  {
    name: '骆驼大赛',
    type: 4,
    score: 8,
    nop: '4-8(5+)',
    time: '30-45',
    personalScore: 7,
    brief: '五只骆驼在赛场上奔驰, 押注骆驼获得赏金, 成为最大的赢家!',
    evaluate: ''
  },
  {
    name: '农场主',
    type: 2,
    score: 7,
    nop: '3-5(5)',
    time: '120',
    personalScore: 7,
    brief: '',
    evaluate: ''
  },
  {
    name: '方舟动物园',
    type: 3,
    score: '-',
    nop: '3-4(4)',
    time: '150',
    personalScore: '-',
    brief: '',
    evaluate: ''
  },
  {
    name: 'cabo',
    type: 4,
    score: 7.5,
    nop: '2-4(3+)',
    time: '15',
    personalScore: 7,
    brief: '',
    evaluate: '等人的时候随便来一局'
  },
  {
    name: '言下之意',
    type: 4,
    score: 7,
    nop: '4-8(6+)',
    time: '30',
    personalScore: 7,
    brief: '',
    evaluate: ''
  },
  {
    name: '恋爱习题',
    type: 4,
    score: 8,
    nop: '3-8',
    time: '15',
    personalScore: 7.5,
    brief: '对观念进行提问回答, 大家对答案聊聊自己的看法。',
    evaluate: '聚会暖场游戏。作为刚认识的人, 恋爱习题能让大家互相了解, 促进双方的关系。'
  },
  {
    name: '赛马大亨',
    type: 4,
    score: 7.5,
    nop: '3-9(4-5)',
    time: '90',
    personalScore: 7.5,
    brief: '赌马',
    evaluate: '只要找对了人, 如果你家隔音不好, 就等着被邻居投诉吧!(玩起来可以非常欢乐, 非常吵!)'
  },
  {
    name: '行动代号',
    type: 4,
    score: 7.5,
    nop: '4或6或8',
    time: '30',
    personalScore: 7,
    brief: '',
    evaluate: ''
  },
  {
    name: '勃艮第城堡',
    type: 2,
    score: 8,
    nop: '3-4(4)',
    time: '90-120',
    personalScore: 8,
    brief: '',
    evaluate: '     1 '
  },
  {
    name: 'E卡',
    type: 4,
    score: 6.5,
    nop: '2',
    time: '5-10',
    personalScore: 6.5,
    brief: '心理博弈小游戏',
    evaluate: '等人简单来一局'
  },
  {
    name: '七人生还者(狼人杀)',
    type: 4,
    score: 7,
    nop: '7-9',
    time: '30',
    personalScore: 8.5,
    brief: '狼人杀的一个变种玩法',
    evaluate: '生还者是一个非常欢乐的游戏, 最好需要有一定狼人杀基础, 否则游戏过程还是可能有一点懵逼'
  },
  {
    name: '画无语',
    type: 4,
    score: 6.5,
    nop: '3-8(5+)',
    time: '30',
    personalScore: 8,
    brief: '',
    evaluate: ''
  },
  {
    name: '阿瓦隆2',
    type: 5,
    score: '-',
    nop: '5-10(7+)',
    time: '60',
    personalScore: 7.5,
    brief: '',
    evaluate: ''
  },
  {
    name: '战争之匣',
    type: 4,
    score: 8,
    nop: '2或4(4)',
    time: '30',
    personalScore: 8,
    brief: '战旗游戏, 控制旗子在棋盘上和对手决斗, 或者占领地盘。',
    evaluate: ''
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
//   brief: '',
//   evaluate: ''
// },
