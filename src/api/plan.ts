import request from '@/utils/request';
import { RegularTabType } from '@/pages/plan/constant';

export interface GetReqularPlanListType {
  // 备忘录, 历史备忘录, 灵感 tab 选项
  tab: RegularTabType,
  page: number
}
// 获取备忘录列表.
export const getRegularPlanList = (params: GetReqularPlanListType) => request.get('/plan/regular-list', { params });
