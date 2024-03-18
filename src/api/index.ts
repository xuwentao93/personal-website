import { request, oldRequest } from '@/utils/request';
import { ArticleType } from '@/constant/enum';

export interface GetArticleListType {
  type: ArticleType,
  page: number,
  pageSize?: number
}
// 根据类型查询文章列表.
export const getArticleList = (params: GetArticleListType) => oldRequest.get('/article/list', { params });

export interface GetArticleType {
  id: string
}
// 获取文章内容.
export const getArticle = (params: GetArticleType) => oldRequest.get('/article/get', { params });

export interface SearchArticleType {
  content: string
}
// 获取查询列表.
export const getSearchList = (params: SearchArticleType) => oldRequest.get('/article/getSearchList', { params });

export interface WriteArticleType {
  type: ArticleType,
  subtype?: string,
  text: string,
  title: string,
  cover?: string,
  brief?: string,
  code: string | null
}
// 写文章.
export const writeArticle = (data: WriteArticleType) => oldRequest.post('/article/write', data);

export interface CheckIdentifyType {
  code: string
}
// 身份校验.
export const checkIdentify = (data: CheckIdentifyType) => oldRequest.post('/auth/checkIdentify', data);

// 增加浏览量.
export const viewArticle = (params: { id: string }) => oldRequest.get('/article/view', { params });
export interface SaveDraftType {
  title?: string,
  text: string
}
// 保存到草稿箱.
export const saveDraft = (data: SaveDraftType) => oldRequest.post('/draft/save', data);

// 从草稿箱里面获取内容.
export const getDraft = () => oldRequest.get('/draft/view');

export interface DeleteArticleType {
  id: string,
  code: string | null
}
// 删除文章.
export const deleteArticle = (data: DeleteArticleType) => oldRequest.post('/article/delete', data);

export interface ModifyArticle extends WriteArticleType{
  id: string,
}
// 修改文章.
export const modifyArticle = (data: ModifyArticle) => oldRequest.post('/article/modify', data);

export interface LoginType {
  code: string,
}

// 登录.
export const login = (data: LoginType) => oldRequest.post('/auth/login', data);

interface SearchTimeAndPlanResponse {
  timeList: {
    a: number
  }[]
}
