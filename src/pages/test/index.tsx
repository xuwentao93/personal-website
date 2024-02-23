import * as React from 'react';
import { useState, useEffect } from 'react';
import './index.less';
import * as utils from '../../interview.js';

const debounce = utils.debounce(() => {
  console.log(1);
}, 500);

const throttle = utils.throttle(() => {
  console.log('throttle');
}, 500);

const { NewPromise } = utils;

export default function Test() {
  const test = () => {
    const promise = new NewPromise((resolve: Function, reject: Function) => {
      let x = Math.random() * 100;
      setTimeout(() => {
        resolve(Math.floor(x));
      }, 1000);
      // if (x < 50) {
      //   resolve('resolve');
      // } else {
      //   reject('reject');
      // }
    });

    promise.then(res => {
      console.log(res);
      return 100;
    }).then(res2 => {
      console.log('res2', res2);
    });

    promise.then(res => {
      console.log(res);
      return 100;
    });

    console.log(promise);
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <div className="" onClick={throttle}>test</div>
  );
}
