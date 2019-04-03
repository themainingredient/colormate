/* eslint-disable */

module.exports = (config) => {
  config.resolve.extensions = ['.sketch.js', '.js', '.jsx'];
  config.module.rules.push({
    test: /\.(html)$/,
    use: [{
      loader: '@skpm/extract-loader',
    },
    {
      loader: 'html-loader',
      options: {
        attrs: [
          'img:src',
          'link:href',
        ],
        interpolate: true,
      },
    },
    ],
  });
  config.module.rules.push({
    test: /\.(css)$/,
    use: [{
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
        loader: "babel-loader"
      },
      {
        loader: "react-svg-loader",
        options: {
          jsx: true // true outputs JSX tags
        }
      }
    ]
  });
  config.module.rules.push({
    test: /\.(gif|png)$/,
    use: [
      {
        loader: 'file-loader',
        options:{
          name: '[name].[ext]',
          publicPath: '..'
        }
      }
    ]
  })
};

/* eslint-enable */
