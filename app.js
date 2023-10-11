const express = require("express");
const app = express();
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/demo";
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));
app.use(express.json());

const model=require('./model')

mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("connect"))
  .catch(() => console.log("err"));

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html");
});

app.get("/data", async(req, res) => {
    res.send(await model.find());
  });
  app.delete("/data/:id", async(req, res) => {
    const data=await model.findByIdAndDelete(req.params.id)
    res.send(await model.find());
  });

app.post('/data',async(req,res)=>{
    const {name,pass}=req.body
    const data= new model({
        name,pass
    })
data.save()
res.json(await model.find())
})




app.listen(4444, () => {
  console.log("done");
});
