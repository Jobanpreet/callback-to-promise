import fs from "fs";
import callbackToPromise from "../src";

describe("callbackToPromise", () => {
  describe("GIVEN converting fs.readFile to promise function", () => {
    describe("GIVEN passed args are correct", () => {
      it("SHOULD read file data", async () => {
        const promise = callbackToPromise(fs.readFile);
        const data = await promise("./src/abc.txt", "utf8");

        expect("file data").toBe(data);
      });
    });

    describe("GIVEN passed args are not correct", () => {
      it("SHOULD read file data", async () => {
        let error;
        const filePath = "./src/file_not_exists.txt";
        try {
          const promise = callbackToPromise(fs.readFile);
          const data = await promise(filePath, "utf8");

          expect("file data").toBe(data);
        } catch (e) {
          error = e.message;
        }

        expect(error).toBe(
          `ENOENT: no such file or directory, open '${filePath}'`
        );
      });
    });
  });
});
