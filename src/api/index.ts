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
  subType?: string,
  text: string,
  title: string,
  cover: any
}

export interface CheckIdentifyType {
  code: string
}

// 根据类型查询文章列表.
export const getArticleList = (params: GetArticleListType) => request.get('/getArticleList', { params });

// 获取文章内容.
export const getArticle = (params: GetArticleType) => request.get('/getArticle', { params });

// 增加浏览量.
export const viewArticle = (params: GetArticleType) => request.get('/viewArticle', { params });

// 获取查询列表.
export const searchArticle = (params: SearchArticleType) => request.get('/getArticleList', { params });

// 写文章.
export const writeArticle = (data: WriteArticleType) => request.post('/writeArticle', data);

// 身份校验.
export const checkIdentify = (data: CheckIdentifyType) => request.post('/checkIdentify', data);
