// Register babel to have ES6 support on the server
require("babel-core/register");

// Prevent issues with libraries using this var (see http://tinyurl.com/pcockwk)
delete process.env.BROWSER;

require("./src/server");
