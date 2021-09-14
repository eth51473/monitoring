const express = require("express");
const path = require("path");
const Rollbar = require("rollbar")
const app = express();

let rollbar = new Rollbar({
  accessToken: "a193da806b10417da3cf2ee4911e1364",
  captureUncaught: true,
  captureUnhandledRejections: true
})
app.get("/",(req,res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
  rollbar.info("HTML file served successfully!")
})



const port = process.env.PORT || 4545;

app.listen(port, () =>{
  console.log(`They're taking the Hobbits to ${port}!`)
})