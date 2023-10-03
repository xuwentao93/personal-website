// 1. 胡牌结束(本局结束).
interface ModifyPointerRequest {
  /* 胡的玩家 */
  winner: string,
  /* 放统玩家, 自摸的话为空字符串 */
  loser: string,
  /* 获胜玩家获胜的点数, 由胡的玩家获得, 放统玩家支付, 庄家自摸, 其他家平分点数,
  闲家自摸(假设获得的点数为 4a), 庄家支付 2a, 其他家支付 a */
  point: number
}

interface ModifyPointerResponse {
  success: boolean
}

// 2. 流局结束. 如果只有一名玩家听牌, 其他家给该名玩家一千点; 两名玩家听牌, 每名各收入 1500,
// 另外两个支出 1500, 三名玩家听牌, 没听的玩家各给其他一人一千点, 四名玩家听牌则没有点数变化.
interface DrawGameRequest {
  /* 听牌的玩家 */
  ReadyHandList: string[]
}

// 3. 初始化牌局(初始每名玩家 25000 点), 无出入参.

// 4. 获取每名玩家点数.
interface GetPointResponse {
  first: number,
  second: number,
  third: number,
  fourth: number,
}
