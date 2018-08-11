// Dependencies
// =============================================================
var express = require("express");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routing
var visitorCount = 0;

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


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});