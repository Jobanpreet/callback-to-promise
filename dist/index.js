"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var errorTypes = {
  NOT_A_FUNCTION: "Passed arg is not a function"
}; // fs.readFile("./src/abc.txt", "utf8", function (err, val) {
//   if (err) {
//     console.log(err);
//     return err;
//   }
//   console.log(val);
// });

var wrapperCallback = function wrapperCallback(resolve, reject) {
  return function (err, value) {
    if (err) {
      reject(err);
    }

    resolve(value);
  };
};

var callbackToPromise = function callbackToPromise(originalFunction) {
  if (typeof originalFunction !== "function") {
    throw new Error(errorTypes["NOT_A_FUNCTION"]);
  }

  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      var callback = wrapperCallback(resolve, reject);
      args.push(callback);
      originalFunction.call.apply(originalFunction, [_this].concat(args));
    });
  };
};

var promise = callbackToPromise(_fs["default"].readFile);
promise("./src/abc.txt", "utf8").then(function (data) {
  console.log(data);
})["catch"](function (err) {
  console.log(err, "err");
});
var _default = callbackToPromise;
exports["default"] = _default;
