const express = require("express");
const app = express();

let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./Develop/public/assets/js/html-routes")(app);
require("./Develop/public/assets/js/api-routes")(app);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
