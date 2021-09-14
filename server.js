const express = require("express");
const path = require("path");
const Rollbar = require("rollbar")

const students =[]
const app = express();
app.use(express.json())

let rollbar = new Rollbar({
  accessToken: "a193da806b10417da3cf2ee4911e1364",
  captureUncaught: true,
  captureUnhandledRejections: true
})
app.get("/",(req,res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
  rollbar.info("HTML file served successfully!")
})

app.post("/api/student",(req,res) =>{
  let {name} = req.body
  name = name.trim();
  students.push(name)

  rollbar.log("Student added successfully", {author: "Ethan", type: "Manual entry"})
  
  res.status(200).send(students)
})



const port = process.env.PORT || 4545;
app.use(rollbar.errorHandler())
app.listen(port, () =>{
  console.log(`They're taking the Hobbits to ${port}!`)
})