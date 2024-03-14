module.exports = api => {
  api.cache(true);
  const isEnvProduction = process.env.NODE_ENV == 'production';
  const isEnvDevelopment = process.env.NODE_ENV == 'development';
  /**
   * @type {import("@babel/core").TransformOptions}
   */
  const config = {
    presets: [
      [
        require.resolve('@babel/preset-env'),
      ],
      [
        require.resolve('@babel/preset-react'),
        {
          runtime: 'automatic'
        }
      ],
      require.resolve('@babel/preset-typescript')
    ].filter(Boolean),
    plugins: [
      !isEnvProduction && require.resolve('react-refresh/babel'),
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          corejs: {
            version: 3,
            proposals: true
          }
        }
      ]
    ].filter(Boolean)
  };

  return config;
};
