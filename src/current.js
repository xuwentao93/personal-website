// JS实现一个带并发限制的异步调度器Scheduler，
// 保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出

// class Scheduler {
//   constructor() {
//     this.task = 0;
//   }

//   add(promiseCreator) {
//   // ...

//   return promiseCreator();
//   }
// }

// const timeout = time => new Promise(resolve => {
//   setTimeout(resolve, time);
// });

// const scheduler = new Scheduler();
// const addTask = (time, order) => {
//   scheduler.add(() => timeout(time))
//     .then(() => console.log(order));
// };

// addTask(1000, '1');
// addTask(500, '2');
// addTask(300, '3');
// addTask(400, '4');

// setTimeout(() => {
//   console.log(1);
// }, 100);

// setTimeout(() => {
//   console.log(2);
// }, 100);

// setTimeout(() => {
//   console.log(3);
// }, 100);

// setTimeout(() => {
//   console.log(4);
// }, 100);

// setTimeout(() => {
//   console.log(5);
// }, 100);
