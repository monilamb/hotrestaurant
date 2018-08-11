// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routing
var visitorCount = 0;
var data = {
    tables: [],
    waitlist: []
};

app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, "home.html"));
   visitorCount++;
 
 });
 
app.get("/reserve", function(req, res) {
   res.sendFile(path.join(__dirname, "reserve.html"));
 });
 
app.get("/tables", function(req, res) {
   res.sendFile(path.join(__dirname, "tables.html"));
 });

//API Routing

app.get("/api/table", function (req, res){
    return res.json(table);
 });
 
 app.get("/api/waitlist", function (req, res){
    return res.json(waitlist);
 });

 app.post("/api/reservation", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newReservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

    console.log(newReservation);

    var contains=false;
    for (var i = 0; i<data.tables.length; i++){
      if (newReservation.UniqueID == data.tables[i].UniqueID){
        contains= true;
      }
    }

    if (!contains){
    if (data.tables.length < 5){
      data.tables.push(newReservation);
    }else{
      data.waitlist.push(newReservation);
    }

   
  }
  return res.json(data);
  });

  app.get("/api/clear", function(req, res) {
    data.tables.length = 0;
    data.waitlist.length = 0;
    res.json(data)
 })
 app.get("/api/visitors", function(req, res) {
    res.json(visitorCount);
  });
 

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});