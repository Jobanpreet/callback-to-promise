const errorTypes = {
  NOT_A_FUNCTION: "Passed arg is not a function",
};

const wrapperCallback = (resolve: Function, reject: Function) => {
  return (err: any, value: any) => {
    if (err) {
      reject(err);
    }
    resolve(value);
  };
};

const callbackToPromise = (originalFunction: Function): Function => {
  if (typeof originalFunction !== "function") {
    throw new Error(errorTypes["NOT_A_FUNCTION"]);
  }

  return (...args: Array<any>) => {
    return new Promise((resolve, reject) => {
      const callback = wrapperCallback(resolve, reject);
      args.push(callback);
      originalFunction.call(this, ...args);
    });
  };
};

export default callbackToPromise;
