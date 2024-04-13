// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  const dateString = new Date(req.params.date);
  const timestamp = new Date(parseInt(req.params.date));

  const date = isNaN(req.params.date) ? dateString : timestamp;

  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let dayOfTheWeek = dayNames[date.getDay()];

  let day = date.getDate();
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const hours = date.getHours() - 1;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  function pad(num) {
    return (num < 10 ? "0" : "") + num;
  }
  res.json({
    unix: dateString.valueOf() || timestamp.valueOf(),
    utc: `${dayOfTheWeek}, ${day} ${month} ${year} ${pad(hours)}:${pad(minutes)}:${pad(seconds)} GMT`,
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
