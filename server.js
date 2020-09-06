//Required modules stored in variables.
var express = require("express");
var path = require("path")
var fs = require("fs")

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./public/assets/js/html-routes")(app);
require("./public/assets/js/api-routes")(app);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

