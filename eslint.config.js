export default [
  {
    extends: ["eslint:recommended", "plugin:webdriverio/recommended"],
    plugins: ["webdriverio"],
    env: {
      browser: true,
      node: true
    }
  }
];
