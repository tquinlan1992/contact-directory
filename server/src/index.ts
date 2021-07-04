import express from "express";
import cors from "cors";
const app = express();
const port = 8080; // default port to listen

app.use(cors());
app.use(express.static(__dirname + "/../../client/build"));

app.get("/test", (req, res) => {
  res.json("test response");
});

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
