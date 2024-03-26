// JS实现一个带并发限制的异步调度器Scheduler，
// 保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出

class Scheduler {
  constructor() {
    this.running = 0; // 记录当前正在执行的任务数
    this.queue = []; // 任务队列
  }

  async add(promiseCreator) {
    this.running++;
    this.queue.push(promiseCreator);
    return new Promise(resolve => {
      this.schedule(resolve, promiseCreator);
    });
  }

  async schedule(resolve, promiseCreator) {
    while (this.queue.length > 0 && this.running < 2) {
      const task = this.queue.shift();
      // eslint-disable-next-line no-await-in-loop
      await task().finally(() => {
        resolve();
        this.running--;
      });
    }
  }
}

const timeout = time => new Promise(resolve => {
  setTimeout(resolve, time);
});

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order));
};

addTask(1000, 'p1');
addTask(500, 'p2');
addTask(300, 'p3');
addTask(400, 'p4');

setTimeout(() => {
  console.log(100);
}, 100);

setTimeout(() => {
  console.log(600);
}, 600);

setTimeout(() => {
  console.log(1100);
}, 1100);

setTimeout(() => {
  console.log(1300);
}, 1300);

// output: 100 p2 600 p3 p1 1100 p4 1300
