import express from "express";
const app = express();
const port = 8080; // default port to listen

app.use(express.static(__dirname + "/../../client/build"));

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
