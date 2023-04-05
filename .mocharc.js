module.exports = {
  require: ["ts-node/register", "./test/chai-like.ts", "./test/setup.ts"],
  spec: ["src/**/*.spec.ts"],
  parallel: false,
  package: "./package.json",
  extension: ["js", "ts"],
  "watch-files": ["src/**/*.ts", "test/**/*.ts"],
  ignore: [ "'src/run.ts'"],
};
