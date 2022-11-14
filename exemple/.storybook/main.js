const paths = require('./paths');

module.exports = {
  stories: list => [...list, '../stories/**/*.stories.stable.@(tsx|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-designs',
    '@storybook/addon-a11y',
    '@storybook/addon-knobs'
  ],
  babel: async (options) => ({
    ...options,
    plugins: []
  }),
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...paths.appAlias,
      },
      modules: [...config.resolve.modules, 'node_modules', 'src', '.storybook']
    }

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]_[local]__[hash:base64:5]',
            },
          },
        },
        'resolve-url-loader',
        'sass-loader',
      ],
    });

    /* Fonts loader */
    config.module.rules.push({
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      include: '/fonts/',
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    });

    /* SVG loader */
    config.module.rules.push({
      test: /\.svg$/,
      exclude: /fonts/,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]',
          },
        },
        {
          loader: 'svgo-loader',
          options: {
            plugins: [{ removeAttrs: { attrs: '*:fill:none' } }],
          },
        },
      ],
    });

    config.module.rules = config.module.rules.map(rule => {
      if (rule.test.toString().includes('svg')) {
        const test = rule.test.toString().replace('svg|', '').replace(/\//g, '')
        return { ...rule, test: new RegExp(test) }
      } else {
        return rule
      }
    });

    return config;
  },
};
