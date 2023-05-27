const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Rest of your webpack configuration...

  plugins: [
    // Other plugins...
    new CopyWebpackPlugin({
      patterns: [
        { from: './items.json', to: 'items.json' },
        // Add more patterns if you have additional files to copy
      ],
    }),
  ],
};
