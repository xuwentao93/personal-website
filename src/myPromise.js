const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const Utils = {
  canChangeState: state => state === PENDING,
  isObject: val => typeof val === 'object' && val !== null,
  isFunction: val => typeof val === 'function',
  isPromise: val => val instanceof MyPromise
};

// class MyPromise {
//   constructor(fn) {
//     this.state = PENDING;
//     this.value = undefined;
//     this.reason = undefined;
//     this.onFulfilledTasks = [];
//     this.onRejectedTasks = [];
//     // eslint-disable-next-line no-unused-expressions
//     Boolean(fn) && fn(this.resolve.bind(this), this.reject.bind(this));
//   }

//   resolve(value) {
//     if (Utils.canChangeState(this.state)) {
//       this.state = FULFILLED;
//       this.value = value;
//       process.nextTick(() => this.onFulfilledTasks.forEach(cb => cb(this.value)));
//     }
//   }

//   reject(reason) {
//     if (Utils.canChangeState(this.state)) {
//       this.state = REJECTED;
//       this.reason = reason;
//       process.nextTick(() => this.onRejectedTasks.forEach(cb => cb(this.reason)));
//     }
//   }

//   then(onFulfilled, onRejected) {
//     onFulfilled = Utils.isFunction(onFulfilled) ? onFulfilled.bind(undefined) : undefined;
//     onRejected = Utils.isFunction(onRejected) ? onRejected.bind(undefined) : undefined;

//     const p2 = new MyPromise((res, rej) => {
//       const wrappedOnFulfilled = () => {
//         if (onFulfilled === undefined) {
//           // 2.2.7.3
//           res(this.value);
//         } else {
//           // 2.2.7.1
//           try {
//             const x = onFulfilled(this.value);
//             MyPromise.resolutionProcedure(p2, x);
//           } catch (error) {
//             rej(error);
//           }
//         }
//       };

//       const wrappedOnRejected = () => {
//         if (onRejected === undefined) {
//           // 2.2.7.4
//           rej(this.reason);
//         } else {
//           try {
//             const x = onRejected(this.reason);
//             MyPromise.resolutionProcedure(p2, x);
//           } catch (error) {
//             rej(error);
//           }
//         }
//       };

//       if (this.state === PENDING) {
//         this.onFulfilledTasks.push(wrappedOnFulfilled);
//         this.onRejectedTasks.push(wrappedOnRejected);
//       } else if (this.state === FULFILLED) {
//         process.nextTick(() => {
//           wrappedOnFulfilled();
//         });
//       } else if (this.state === REJECTED) {
//         process.nextTick(() => {
//           wrappedOnRejected();
//         });
//       }
//     });

//     return p2;
//   }

//   static resolutionProcedure(promise, x) {
//     if (promise === x) {
//       throw new TypeError('type error');
//     }

//     if (Utils.isPromise(x)) {
//       x.then(
//         res => {
//           MyPromise.resolutionProcedure(promise, res);
//         },
//         err => {
//           promise.reject(err);
//         }
//       );
//     } else if (Utils.isObject(x) || Utils.isFunction(x)) {
//       let xThen;
//       try {
//         xThen = x.then;
//       } catch (error) {
//         promise.reject(error);
//         return;
//       }

//       if (Utils.isFunction(xThen)) {
//         let hasCalledProcedure = false;
//         const reslovePromise = function (y) {
//           if (hasCalledProcedure) {
//             return;
//           }
//           hasCalledProcedure = true;
//           MyPromise.resolutionProcedure(promise, y);
//         };
//         const rejectPromise = function (r) {
//           if (hasCalledProcedure) {
//             return;
//           }
//           hasCalledProcedure = true;
//           promise.reject(r);
//         };
//         try {
//           xThen.call(x, reslovePromise, rejectPromise);
//         } catch (err) {
//           if (hasCalledProcedure) {
//             return;
//           }
//           hasCalledProcedure = true;
//           promise.reject(err);
//         }
//       } else {
//         promise.resolve(x);
//       }
//     } else {
//       promise.resolve(x);
//     }
//   }
// }

class MyPromise {
  constructor(excute) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledTasks = [];
    this.onRejectedTasks = [];

    const resolve = value => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        process.nextTick(this.onFulfilledTasks.forEach(fn => fn));
      }
    };

    const reject = reason => {
      if (this.state === )
    }

  }
}

function deferred() {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = { deferred, MyPromise, Utils };

// class MyPromise {
//   constructor(excute) {
//     this.state = PENDING;
//     this.value = undefined;
//     this.reason = undefined;
//     this.onFulfilledTasks = [];
//     this.onRejectedTasks = [];
//   }

//   resolve(value) {
//     return value instanceof MyPromise ? value : new MyPromise(resolve => resolve(value));
//   }

//   reject(reason) {

//   }

//   then(resolve, reject) {

//   }
// }

module.exports = { deferred, MyPromise, Utils };
