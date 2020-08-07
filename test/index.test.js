import fs from "fs";
import callbackToPromise from "../build";

describe("callbackToPromise", () => {
  describe("GIVEN converting fs.readFile to promise function", () => {
    describe("GIVEN passed args are correct", () => {
      it("SHOULD read file data", async () => {
        const promise = callbackToPromise(fs.readFile);
        const response = await promise("./test/text-file.txt", "utf8");

        expect("file data").toEqual(response.data);
      });
    });

    describe("GIVEN passed args are not correct", () => {
      it("SHOULD read file data", async () => {
        let error;
        const filePath = "./file_not_exists.txt";
        try {
          const promise = callbackToPromise(fs.readFile);
          await promise(filePath, "utf8");
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe(
          `ENOENT: no such file or directory, open '${filePath}'`
        );
      });
    });

    describe("GIVEN passed args are not correct", () => {
      it("SHOULD read file data", async () => {
        let error;
        const filePath = "./file_not_exists.txt";
        try {
          const promise = callbackToPromise(fs.readFile);
          await promise(filePath, "utf8");
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe(
          `ENOENT: no such file or directory, open '${filePath}'`
        );
      });
    });
  });

  describe("GIVEN calling custom callback based function", () => {
    describe("GIVEN callback is passing 2 args", () => {
      it("SHOULD return reponse.data as array", async () => {
        const arg1 = "callback";
        const arg2 = "promise";

        function customFun(param1, param2, callback) {
          callback(param1, param2);
        }

        const promise = callbackToPromise(customFun);
        const { data } = await promise(arg1, arg2);
        expect(data[0]).toBe(arg1);
        expect(data[1]).toBe(arg2);
      });
    });
  });
});
