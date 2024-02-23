/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-return */
/* eslint-disable prefer-rest-params */

// 1. 防抖,节流
export function debounce(fn, time) {
  let timer;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    const args = arguments;

    timer = window.setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

export function throttle(fn, time) {
  let prev = 0;

  return function () {
    const date = new Date();
    const now = date.getTime();
    if (now - prev > time) {
      fn.apply(this, arguments);
      prev = now;
    }
  };
}

// 2. Promise

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

export class NewPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    // then 在调用后会立即被执行, 但是 promise 的状态还为 pending, 这里一个待执行数组, 等状态改变以后一起执行.
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    // 入参不是函数, 抛出异常.
    if (typeof executor !== 'function') {
      throw TypeError(`Promise resolver ${executor} is not a function!`);
    }

    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    const reject = reason => {
      if (this.value === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
      throw err;
    };

    const newPromise = new NewPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // A+ 2.2.4
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        // A+ 2.2.3
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
      }
    });

    return newPromise;
  }

  // resolve 可以把任何值转化成是 fulfilled 的 promise, 如果原本就是 promise, 则原封不动返回.
  resolve(value) {
    if (value instanceof NewPromise) return value;
    return new NewPromise(resolve => resolve(value));
  }

  // 与 resolve 不同, 如果参数是 promise 对象, 也会被当做值转化成新的 promise 对象.
  reject(reason) {
    return new NewPromise((resolve, reject) => reject(reason));
  }

  // 转入的 promise, 全部都是 fullfilled 就会返回 fullfiled 的 promise; 只要有一个是 reject, 就是 reject; 只要
  // 有一个是 pending, 就会返回 pending.
  all(promiseList) {
    if (!Array.isArray(promiseList)) {
      throw TypeError(`${promiseList} is not iterable`);
    }

    let i = 0;
    const result = [];
    return new NewPromise((resolve, reject) => {
      promiseList.forEach((promise, index) => {
        NewPromise.resolve(promise).then(value => {
          result[index] = value;
          i++;
          if (i === promiseList.length) {
            resolve(result);
          }
        }, error => {
          reject(error);
        });
      });
    });
  }

  // race 会判断第一个先执行完的 promise, 并以他的状态作为新 promise 的状态
  race(promiseList) {
    if (!Array.isArray(promiseList)) {
      throw TypeError(`${promiseList} is not iterable`);
    }

    return new NewPromise((resolve, reject) => {
      promiseList.forEach(promise => {
        NewPromise.resolve(promise).then(v => resolve(v), err => reject(err));
      });
    });
  }

  // 所有 promise 的状态都返回了, 会获得一个新的 fulfiled 的 promise 实例, 它的值是一个数组表示所有
  // promise 的状态; 如果有一个是 pending, 则返回一个 pending 的新 promise 实例.
  allSettled(promiseList) {
    if (!Array.isArray(promiseList)) {
      throw TypeError(`${promiseList} is not iterable`);
    }
    const result = [];

    return new NewPromise(resolve => {
      promiseList.forEach(promise => {
        NewPromise.resolve(promise).then(value => {
          result.push({
            status: FULFILLED,
            value
          });
          if (result.length === promiseList.length) resolve(result);
        }, reason => {
          result.push({
            status: REJECTED,
            reason
          });
          if (result.length === promiseList.length) resolve(result);
        });
      });
    });
  }

  // 全部都 reject, 则抛出异常 rejected; 否则, 只要有一个是 fulfiled, 返回第一个 fulfilled 实例.
  any(promiseList) {
    if (!Array.isArray(promiseList)) {
      throw TypeError(`${promiseList} is not iterable`);
    }

    let i = 0;
    return new NewPromise((resolve, reject) => {
      promiseList.forEach(promise => {
        NewPromise.resolve(promise).then(value => {
          resolve(value);
        });
      }, () => {
        i++;
        if (i === promiseList.length) {
          reject(new Error('All promises were rejected'));
        }
      });
    });
  }
}

const resolvePromise = (promise, x, resolve, reject) => {
  // 自己无法等待自己.
  if (promise === x) {
    return reject(new TypeError('Chaining cycle deteced for promise #<Promise>'));
  }

  let called;

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      const { then } = x;
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true;

          // y 可能还是一个 promise 对象, 递归解析.
          resolvePromise(promise, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        resolve(x);
      }
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
  } else {
    resolve(x);
  }
};

// 3. 深拷贝, 能够识别正则和日期.

const isObject = target => (typeof target === 'object' || typeof target === 'function') && target !== null;

export function deepClone(target, map = new Map()) {
  // 已有的直接赋值, 对于有相同引用的对象是加速了.
  if (map.get(target)) return target;

  const { constructor } = target;
  if (/^(RegExp|Date)$/i.test(constructor)) {
    return new constructor(target);
  }

  if (isObject(target)) {
    map.set(target, true);
    const result = Array.isArray(target) ? [] : {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone(result[key], map);
      }
    }
  } else {
    return target;
  }
}
