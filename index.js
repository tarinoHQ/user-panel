// Register babel to have ES6 support on the server
require("babel-register")({
  presets: [
    ["env", { 
      target: { 
        node: 'current' 
      } 
    }],
    "react",
    "stage-0"
  ],
  plugins: [
    'transform-decorators-legacy',
    'transform-regenerator',
    "transform-es2015-destructuring", 
    "transform-object-rest-spread",
  ],
  babelrc: false,
});

// Prevent issues with libraries using this var (see http://tinyurl.com/pcockwk)
delete process.env.BROWSER;

require("./src/server");
