/* eslint-disable no-unused-vars */
import { ArticleType } from '@/constant/enum';
import { WriteArticleType } from '@/api';

export enum writeType {
  title = 'title',
  cover = 'cover',
  type = 'type',
  subtype = 'subtype',
  text = 'text'
}

interface WriteAction {
  type: string,
  value: number | string
}

export const initialParams: WriteArticleType = {
  type: ArticleType.other,
  subtype: '',
  cover: '',
  text: '',
  title: ''
};

export function reducer(state: WriteArticleType, action: WriteAction) {
  return {
    ...state,
    [action.type]: action.value
  };
}
