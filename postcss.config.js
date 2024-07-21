const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const { auto } = require("neo-async");

module.exports = {
  // подключите плагины к PostCSS
  plugins: [
    // подключите autoprefixer
    autoprefixer,
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: "default" }),
  ],
};
