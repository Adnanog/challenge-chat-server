const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const ourChat = [];
app.get("/", function(req, res) {
  res.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});
app.listen(process.env.PORT || 3030, () => {
  console.log("my app is running!");
});
const cors = require("cors");
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello chatters");
});
app.get("/messages", function(req, res) {
  console.log("my quotes are coming");

  res.send(ourChat);
});
app.get("/messages/search", (req, res) => {
  var searchMessage = req.query.text;
  var searchResult = ourChat.filter(item => {
    return (
      item.text.toLowerCase().includes(searchMessage.toLowerCase()) ||
      item.from.toLowerCase().includes(searchMessage.toLowerCase())
    );
  });
  res.send(searchResult);
});
app.post("/messages", (req, res) => {
  console.log(req.body);
  if (req.body.from && req.body.text && req.body.text !== "") {
    var messageWithTime = req.body;
    messageWithTime.timesent = new Date();
    ourChat.push(messageWithTime);
    res.send("this is the post my endpoint");
  } else {
    res.status(400).send("wrong");
  }
});
app.get("/messages/:id", function(req, res) {
  console.log("my quotes are coming");
  var requiredId = req.params.id;
  var message = ourChat.find(message => {
    return message.id === requiredId;
  });
  res.send(message);
});
app.delete("/messages/:id", (req, res) => {
  const quoteToDelete = ourChat.find(message => message.id === req.params.id);
  ourChat.splice(ourChat.indexOf(quoteToDelete), 1);
  res.send("Deleted Quote " + req.params.id);
});
app.put("/messages/:id", (req, res) => {
  const index = ourChat.findIndex(message => message.id === req.params.id);
  // ourChat[index] = { ...ourChat[index], ...req.body.text };
 ourChat[index].text= req.body.text;
  res.send(ourChat[index]);
});
