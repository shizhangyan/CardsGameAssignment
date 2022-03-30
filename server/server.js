const express = require("express");
const dotenv = require("dotenv");
const app = express();
const tasks = require("./routes/tasks");

app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/tasks", tasks);

const port = 8000;

app.listen(port, () => {
  console.log("server is listening on port 8000...");
});
