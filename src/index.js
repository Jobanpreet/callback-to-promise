import fs from "fs";
const errorTypes = {
  NOT_A_FUNCTION: "Passed arg is not a function",
};

const wrapperCallback = (resolve, reject) => {
  return (err, value) => {
    if (err) {
      reject(err);
    }
    resolve(value);
  };
};

const callbackToPromise = (originalFunction) => {
  if (typeof originalFunction !== "function") {
    throw new Error(errorTypes["NOT_A_FUNCTION"]);
  }

  return (...args) => {
    return new Promise((resolve, reject) => {
      const callback = wrapperCallback(resolve, reject);
      args.push(callback);
      originalFunction.call(this, ...args);
    });
  };
};

const promise = callbackToPromise(fs.readFile);
promise("./src/abc.txt", "utf8")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err, "err");
  });

export default callbackToPromise;
