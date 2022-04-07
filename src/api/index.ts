import request from '@/utils/request';
import { ArticleType } from '@/constant/enum';

export interface GetArticleListType {
  type: ArticleType
}

export interface GetArticleType {
  id: string
}

export interface SearchArticleType {
  content: string
}

export interface WriteArticleType {
  type: ArticleType,
  subtype?: string,
  text: string,
  title: string,
  cover: string
}

export interface CheckIdentifyType {
  code: string
}

// 根据类型查询文章列表.
export const getArticleList = (params: GetArticleListType) => request.get('/article/list', { params });

// 获取文章内容.
export const getArticle = (params: GetArticleType) => request.get('/article/get', { params });

// 增加浏览量.
export const viewArticle = (params: { id: string }) => request.get('/article/view', { params });

// 获取查询列表.
export const getSearchList = (params: SearchArticleType) => request.get('​/article​/getSearchList', { params });

// 写文章.
export const writeArticle = (data: WriteArticleType) => request.post('/article/write', data);

// 身份校验.
export const checkIdentify = (data: CheckIdentifyType) => request.post('/auth/checkIdentify', data);
