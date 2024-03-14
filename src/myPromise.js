/* eslint-disable class-methods-use-this */
// 11. 再战 promise, 自己手写, 根据 A+ 规范.

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class HandlePromise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.resolveList = [];
    this.rejectList = [];

    if (this.status === PENDING) {
      console.log(1);
    }
  }

  resolve(value) {
    if (value instanceof HandlePromise) {
      return value;
    }
    return new HandlePromise(resolve => resolve(value));
  }
}

HandlePromise.deferred = function () {
  let result = {};
  result.promise = new HandlePromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

module.exports = HandlePromise;
