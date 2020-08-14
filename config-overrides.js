/* eslint-disable */
const {
  override,
  addWebpackModuleRule,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  // Add base64 converter
  addWebpackModuleRule({
    test: /\.(png|jpg|gif)$/i,
    use: [{ loader: "url-loader" }],
  }),
  addWebpackAlias({
    src: path.resolve(__dirname, "./src"),
    "@overrided-vkui": path.resolve(
      __dirname,
      "./src/components/overridedVkUi"
    ),
  })
);
