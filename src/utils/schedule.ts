export default class Scheduler {
  private running: number;
  private queue: Array<{
    request: Function,
    resolve: Function,
    index: number
  }>;
  private limit: number;
  private pauseLimit: number;
  private taskLength: number;
  private result: any[];
  private errorTime: number;
  private errorList: number[];

  

  constructor(limit = 10, errorTime = 3) {
    this.running = 0; // 记录当前正在执行的任务数
    this.queue = []; // 任务队列
    this.limit = limit; // 上限的任务.
    this.result = []; // 请求返回的内容.
    this.taskLength = 0; //
    this.pauseLimit = limit;
    this.errorTime = errorTime; // 重传次数.
    this.errorList = []; // 错误列表.
  }

  add(requestList: Function[]) {
    return new Promise(resolve => {
      this.taskLength = requestList.length;
      for (let i = 0; i < requestList.length; i++) {
        this.queue.push({
          request: requestList[i],
          resolve,
          index: i
        });
      }
      // 开启上限任务的队列.
      for (let i = 0; i < this.limit; i++) {
        this.schedule(); // 调度任务
      }
    });
  }

  async schedule() {
    while (this.queue.length > 0 && this.running < this.limit) {
      console.log(this.limit);
      // 已经有长度了, 不会出现 shift 取出后是 undefined 的情况.
      const { request, resolve, index } = this.queue.shift() as any;
      this.running++;
      // eslint-disable-next-line no-await-in-loop
      await request().then((result: any) => {
        this.result[index] = {
          status: 'success',
          result
        };
      })
      .catch((err: any) => {
        if (!this.errorList[index] || this.errorList[index] < 3) {
          if (!this.errorList[index]) {
            this.errorList[index] = 1;
          } else {
            this.errorList[index]++;
          }
          this.queue.unshift({
            request,
            resolve,
            index
          });
        } else if (this.errorList[index] === 3) {
          this.result[index] = ({
            status: 'fail',
            err
          });
        }
      })
      .finally(() => {
        this.running--;
        if (this.result.length === this.taskLength) {
          resolve(this.result);
        }
      });
    }
  }

  pause() {
    this.limit = 0;
  }

  continue() {
    this.limit = this.pauseLimit;

    for (let i = 0; i < this.limit; i++) {
      this.schedule();
    }
  }
}