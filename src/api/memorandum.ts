import request from '@/utils/request';
import { MemorandumTabType } from '@/pages/memorandum/constant';
import { PriorityLevel, OperateType } from '@/pages/memorandum/constant';

export interface GetMemorandumListType {
  // 备忘录, 历史备忘录, 灵感 tab 选项
  tab: MemorandumTabType,
  search?: string,
  priority?: PriorityLevel,
  date?: [string, string]
  page: number
}
// 获取备忘录列表.
export const getMemorandumList = (params: GetMemorandumListType) => request.get('/memorandum/list', { params });

export interface AddMemorandumType {
  type: MemorandumTabType.current | MemorandumTabType.history,
  task: string,
  priority?: PriorityLevel,
  timeType: 'everyDay' | 'timing'
  remainTime: number
}

// 添加备忘录
export const addMemorandum = (data: AddMemorandumType) => request.post('/memorandum/add', data);

export interface fetchTaskType {
  id: number,
  taskType: MemorandumTabType.current | MemorandumTabType.inspiration,
  operateType: OperateType
}

// 操作 task
export const fetchOperateTask = (data: fetchTaskType) => request.post('/memorandum/operate', data);

