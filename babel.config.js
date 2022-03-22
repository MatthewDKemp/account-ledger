module.exports = {
  sourceType: "unambiguous",
  presets: [
    [
      "@babel/env",
      {
        useBuiltIns: "usage",
        targets: "last 1 version, > 1%, not dead",
        corejs: 3,
      },
    ],
    "@babel/react",
  ],
};
