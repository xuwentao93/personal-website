import { ArticleType } from '@/constant/enum';

export interface TitieListType {
  text: string,
  code: ArticleType,
  selected: boolean
}

export const titleListMap: TitieListType[] = [
  {
    text: '全部',
    code: ArticleType.all,
    selected: false
  },
  {
    text: '近期',
    code: ArticleType.current,
    selected: false
  },
  {
    text: '前端',
    code: ArticleType.frontend,
    selected: false
  },
  {
    text: '网络',
    code: ArticleType.network,
    selected: false
  },
  {
    text: '算法',
    code: ArticleType.algorithm,
    selected: false
  },
  {
    text: '生活',
    code: ArticleType.life,
    selected: false
  },
  {
    text: '其他',
    code: ArticleType.other,
    selected: false
  }
];
