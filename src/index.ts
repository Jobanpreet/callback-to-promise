const errorTypes = {
  NOT_A_FUNCTION: "Passed arg is not a function",
};

const responseCreator = (data: any) => {
  return { data };
}

const wrapperCallback = (resolve: Function, reject: Function) => {
  return (...args: Array<any>) => {
    const length = args.length;
    if (!length) {
      resolve(responseCreator(null));
    }
    //Node: node js callback will have first args as err object.
    if (args[0] && args[0].errno) {
      reject(args[0]);
    }

    if (length === 1) {
      resolve(responseCreator(args[0]));
    }

    //node callback will have first agrs as null iF there is no error.
    if (args[0] === null || args[0] === undefined) {
      const [, ...restArgs] = args;
      resolve(responseCreator(restArgs.length === 1 ? restArgs[0] : restArgs));
    }

    resolve(responseCreator(args));
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