const Encore = require('@symfony/webpack-encore');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const title = 'my-project';

Encore
  .configureRuntimeEnvironment(process.env.NODE_ENV || 'dev')
  .setOutputPath(`dist/${title}/`)
  .setPublicPath('/')
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  // CSS entry points
  .addStyleEntry(`assets/css/framework-${title}`, `./sources/${title}/sass/framework.scss`)
  .addStyleEntry(`assets/css/apps-${title}`, `./sources/${title}/sass/apps.scss`)
  .addStyleEntry(`assets/css/library-${title}`, `./sources/${title}/sass/library.scss`)
  .enableSassLoader(options => {
    options.sourceMap = !Encore.isProduction();
  })
  .enablePostCssLoader(options => {
    options.postcssOptions = {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    };
  })

  // JavaScript entry points
  .addEntry(`assets/js/runtime`, `./sources/${title}/js/runtime.js`)
  .addEntry(`assets/js/framework-${title}`, `./sources/${title}/js/framework.js`)
  .addEntry(`assets/js/apps-${title}`, `./sources/${title}/js/apps.js`)
  .addEntry(`assets/js/library-${title}`, `./sources/${title}/js/library.js`)

  // Plugins
  .addPlugin(new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html'
  }))

  // copy static files
  .copyFiles({
    from: `./sources/${title}/images`,
    to: `assets/${title}/images/[path][name].[hash:8].[ext]`,
  })
  .copyFiles({
    from: `./sources/${title}/fonts`,
    to: `assets/${title}/fonts/[path][name].[hash:8].[ext]`,
  })

  // enable dev server
  .configureDevServerOptions(options => {
    options.host = 'localhost';
    options.port = 8080;
  })
  .disableSingleRuntimeChunk()
  .enableBuildNotifications()
  .enableReactPreset();

module.exports = Encore.getWebpackConfig();
