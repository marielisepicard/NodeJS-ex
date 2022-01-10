const http = require("http");
const express = require("express");

const userRoutes = require("./routes/getJobOffers");
const errorRoutes = require("./routes/wrongUrl");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/getOpenJobsInfos", userRoutes);
app.all("*", errorRoutes);

server.listen(process.env.PORT || 3000);
