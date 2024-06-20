import request from '@/utils/request';
import { PriorityLevel } from '@/pages/memorandum/constant';

export interface GetMemorandumListType {
  // 备忘录, 历史备忘录, 灵感 tab 选项
  tab: string,
  search?: string,
  priority?: PriorityLevel,
  date?: [string, string]
  page: number
}
// 获取备忘录列表.
export const getMemorandumList = (params: GetMemorandumListType) => request.get('/memorandum/list', { params });
