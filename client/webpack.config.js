config = {
  entry: __dirname + "/src/app.js", //entry point of all the JS files
  output: {
    filename: "bundle.js",
    path: __dirname + "/build"
  },
  devtool: 'source-map' //helps to identify line of code with the error eg

}

module.exports = config;
