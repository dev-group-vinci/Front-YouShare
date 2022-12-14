//Install express server
const express = require("express");
const path = require("path");

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/you-share"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/you-share/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

// This will stop you from getting any CORS errors.
app.use("*", async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localapp.com:3000")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization")
  res.setHeader("Access-Control-Allow-Credentials", true)
  next()
})
