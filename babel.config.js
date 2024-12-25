module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead",
      },
    ],
  ],
  overrides: [
    {
      test: "./src",
      plugins: [
        // Transform `module.exports` into `export default`
        [
          "babel-plugin-transform-commonjs",
          {
            allowTopLevelThis: true,
          },
        ],
      ],
    },
  ],
};
