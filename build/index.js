"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var errorTypes = {
    NOT_A_FUNCTION: "Passed arg is not a function",
};
var responseCreator = function (data) {
    return { data: data };
};
var wrapperCallback = function (resolve, reject) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var length = args.length;
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
            var restArgs = args.slice(1);
            resolve(responseCreator(restArgs.length === 1 ? restArgs[0] : restArgs));
        }
        resolve(responseCreator(args));
    };
};
var callbackToPromise = function (originalFunction) {
    if (typeof originalFunction !== "function") {
        throw new Error(errorTypes["NOT_A_FUNCTION"]);
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var callback = wrapperCallback(resolve, reject);
            args.push(callback);
            originalFunction.call.apply(originalFunction, __spreadArrays([_this], args));
        });
    };
};
exports.default = callbackToPromise;
