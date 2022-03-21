export const titleListMap: TitieListType[] = [
  {
    text: '全部',
    code: 'all',
    selected: false
  },
  {
    text: '近期',
    code: 'current',
    selected: false
  },
  {
    text: '前端',
    code: 'frontend',
    selected: false
  },
  {
    text: '网络',
    code: 'network',
    selected: false
  },
  {
    text: '算法',
    code: 'algorithm',
    selected: false
  },
  {
    text: '生活',
    code: 'life',
    selected: false
  },
  {
    text: '其他',
    code: 'ohter',
    selected: false
  }
];

export interface TitieListType {
  text: string,
  code: string,
  selected: boolean
}
