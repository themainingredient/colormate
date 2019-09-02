/* eslint-disable */
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = config => {
  config.resolve.extensions = ['.sketch.js', '.js', '.jsx', '.ts', '.tsx'];

  config.module.rules.push({
    test: /\.(html)$/,
    use: [
      {
        loader: '@skpm/extract-loader',
      },
      {
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'link:href'],
          interpolate: true,
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.(css)$/,
    use: [
      {
        loader: '@skpm/extract-loader',
      },
      {
        loader: 'css-loader',
      },
    ],
  });

  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'react-svg-loader',
        options: {
          jsx: true, // true outputs JSX tags
          svgo: {
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          }
        },
      },
    ],
  });
  
  config.module.rules.push({
    test: /\.(gif|png|otf)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '..',
        },
      },
    ],
  });

  // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'ts-loader'
  });

  // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
  config.module.rules.push({ 
    enforce: "pre", 
    test: /\.js$/, 
    loader: "source-map-loader"
  })

  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  config.plugins.push(new webpack.DefinePlugin(envKeys));

  config.devtool = "source-map"
};

/* eslint-enable */
