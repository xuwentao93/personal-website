/* eslint-disable max-classes-per-file */
/* eslint-disable guard-for-in */
/* eslint-disable no-continue */
/* eslint-disable no-proto */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-extend-native */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-rest-params */

// 1. 防抖,节流
export function debounce(fn, time) {
  let timer;
  console.log('test');
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
        // A+ 2.2.4 异步调用.
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
        // A+ 2.2.3, 不能被调用多次
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
    return value instanceof NewPromise ? value : new NewPromise(resolve => resolve(value));
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
// export function deepClone(target, map = new Map()) {
//   // map 的用意是保证相同引用的对象在 copy 之后, 仍然保持相同引用, 并且这里可以加速 copy.
//   if (map.get(target)) return map.get(target);

//   const constructor = target?.constructor;
//   if (/^(RegExp|Date)$/i.test(constructor)) {
//     return new constructor(target);
//   }

//   if (isObject(target)) {
//     const result = Array.isArray(target) ? [] : {};
//     for (let key in target) {
//       if (target.hasOwnProperty(key)) {
//         result[key] = deepClone(target[key], map);
//       }
//     }
//     map.set(target, result);
//     return result;
//   }

//   return target;
// }

// 4. 手写数组原生函数.

Array.prototype.forEach2 = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = Object(this);

  for (let i = 0; i < arr.length; i++) {
    callback.call(thisArg, arr[i], i, arr);
  }
};

Array.prototype.map2 = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = Object(this);
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result[i] = callback.call(thisArg, arr[i], i, arr);
  }
  return result;
};

Array.prototype.filter2 = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = Object(this);
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
};

Array.prototype.some2 = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = Object(this);
  for (let i = 0; i < arr.length; i++) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      return true;
    }
  }
  return false;
};

Array.prototype.reduce2 = function (callback, initialValue) {
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = Object(this);
  const length = arguments.length >= 2 ? 2 : 1;
  // 多余的参数会被 js 过滤掉, 这么写是为了判断用户传入了 undefined.
  let acc = length >= 2 ? initialValue : arr[0];
  for (let i = 2 - length; i < arr.length; i++) {
    acc = callback(acc, arr[i], i, arr);
  }
  return acc;
};

// 5. 手写原生函数方法.

Function.prototype.call2 = function (context, ...args) {
  if (this === Function.prototype) {
    return undefined;
  }

  // 非严格模式下, 如果没有传入对象会是顶部对象.
  context = context || window;
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

Function.prototype.bind2 = function (context, ...args1) {
  if (this === Function.prototype) {
    throw TypeError('Function.prototype can\'t be params');
  }

  const _this = this;

  return function F(...args2) {
    // 用于构造函数.
    if (this instanceof F) {
      return new _this(...args1, ...args2);
    }
    return _this.apply(context, ...args1, ...args2);
  };
};

// 6. new. new 的逻辑有三: 1.创造一个新对象. 2.链接该对象到另一个对象.3.如果没有返回对象,则返回 this.
export function objectFactory(constructor, ...args) {
  if (!(constructor instanceof Function)) {
    throw TypeError(`${constructor} is not a function!`);
  }

  const obj = Object.create(constructor);

  const ret = constructor.call(obj, ...args);

  return typeof ret === 'object' ? ret : obj;
}

// 7. instanceof.

export function mockInstanceof(obj, constructor) {
  while (obj?.__proto__) {
    if (obj.__proto__ === constructor?.prototype) return true;
    obj = obj.__proto__;
  }
  return false;
}

// 8.Object.create.
export function mockCreate(constructor, value = undefined) {
  if (typeof constructor !== 'object' && typeof constructor !== 'function' && !constructor) {
    throw TypeError(`${constructor} is not a object or function!`);
  }

  function F() {}
  F.prototype = constructor;

  const obj = new F();
  if (value) Object.defineProperties(obj, value);

  return obj;
}

// 9. Object.assign. 对于数组和对象表现形式要区分开来.
Object.assign2 = function (obj, ...soureces) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < soureces.length; i++) {
      if (!soureces[i] || typeof obj !== 'object') continue;
      if (Array.isArray(soureces[i])) {
        soureces[i].forEach((item, key) => {
          obj[key] = item;
        });
      } else {
        for (let x in soureces[i]) {
          if (soureces[i].hasOwnProperty(x)) {
            obj.push(soureces[i][x]);
          }
        }
      }
    }
  } else {
    // 如果是对象.
    for (let i = 0; i < soureces.length; i++) {
      if (!soureces[i] || typeof obj !== 'object') continue;
      if (Array.isArray(soureces[i])) {
        soureces[i].forEach((item, key) => {
          obj[key] = item;
        });
      } else {
        for (let x in soureces[i]) {
          if (soureces[i].hasOwnProperty(x)) {
            obj[x] = soureces[i][x];
          }
        }
      }
    }
  }

  return obj;
};

// 10. JSON.stringify or parse?

// 递归扁平化.

function flat(item, ans = []) {
  for (let i = 0; i < item.length; i++) {
    if (Array.isArray(item[i])) {
      flat(item[i], ans);
    } else {
      ans.push(item[i]);
    }
  }
  return ans;
}

function deepClone(value) {
  const isObject = target => (typeof target === 'object' || typeof target === 'function') && target !== null;
  const getType = obj => Object.prototype.toString.call(obj).slice(8, -1);
  const firstSymbol = Symbol('first');
  // 储存最外层对象和已经出现的对象.
  const map = new Map();

  function clone(context, first = true) {
    // 已经重复出现的对象, 快速 copy, 性能上更快, 并且 copy 后的对象也是相同引用的.
    if (map.get(context)) {
      return map.get(context);
    }
    //  处理 RegExp, Date.
    const constructor = context?.constructor;
    const constructorStr = getType(context);

    if (constructorStr === 'RegExp' || constructorStr === 'Date') {
      const result = new constructor(context);
      map.set(context, result);
      return result;
    }

    // 处理 symbol.
    if (constructorStr === 'Symbol') {
      return Object(Symbol.prototype.valueOf.call(context));
    }

    // 处理 Function.
    if (constructorStr === 'Function') {
      const cloneFunction = function (...args) {
        context.apply(this, ...args);
      };
      for (const key in context) {
        if (context.hasOwnProperty(key)) {
          cloneFunction[key] = deepClone(context[key]);
        }
      }
      map.set(context, cloneFunction);
      return cloneFunction;
    }

    // 处理 Map.
    if (constructorStr === 'Map') {
      const map = new constructor();
      context.forEach((k, v) => map.set(clone(k), clone(v)));
      map.set(context, map);
      return map;
    }

    // 处理 Set.
    if (constructorStr === 'Set') {
      const set = new constructor();
      for (const value of context.values()) {
        set.add(clone(value));
      }
      map.set(context, set);
      return set;
    }

    // WeakSet, WeakMap 无法被深拷贝, 所以直接返回对象.
    if (constructorStr === 'WeakSet' || constructorStr === 'WeakMap' || constructorStr === 'Promise') {
      return context;
    }

    // 处理普通 object 和 数组.
    if (isObject(context)) {
      const result = Array.isArray(context) ? [] : {};
      if (first) {
        map.set(firstSymbol, result);
      }
      if (context === value && !first) {
        return map.get(firstSymbol);
      }
      for (const key in context) {
        if (context.hasOwnProperty(key)) {
          result[key] = clone(context[key], false);
        }
      }
      map.set(context, result);
      return result;
    }

    return context;
  }

  return clone(value);
}

const commonObj = {};

const example = {
  str: 'str',
  num: 10,
  bool: true,
  symbol: Symbol('symbol'),
  emptyObj: {},
  date: new Date(),
  exp: /1/,
  map: new Map(),
  set: new Set([1, 2, 3, 4, 'str']),
  weakMap: new WeakMap(),
  weakSet: new WeakSet([{}, commonObj]),
  promise: new Promise(resolve => resolve(1)),
  // 测试共同指针的对象.
  commonObj,
  fn() {
    console.log('this is fn');
    console.log(this);
  },
  obj: {
    a: 1,
    b: 2,
    commonObj
  }
};

// example.obj.self = example;
// example.map.set(1, 1);
// example.map.set('1', '1');
// example.map.set({}, {});
// example.map.set('obj', commonObj);
// example.map.set('obj2', commonObj);
// example.weakMap.set({}, {});
// example.weakMap.set(commonObj, commonObj);
// example.weakMap.set({}, commonObj);

// const test = deepClone(example);

// console.log(_.deepClone(example));

// console.log('test:', test);
console.log('map:', example.map);
