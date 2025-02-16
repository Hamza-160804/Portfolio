module.exports = {
  {
    test: /\.css$/,
    use: [
      "style-loader",  // Injects CSS into DOM
      "css-loader",    // Parses CSS
      {
        loader: "postcss-loader", // Processes CSS with PostCSS plugins
        options: {
          postcssOptions: {
            plugins: ["tailwindcss", "autoprefixer"],
          },
        },
      },
    ],
  }
  
};
