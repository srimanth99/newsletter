const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const https = require("https");


const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  const fname = req.body.Fname
  const lname = req.body.Lname
  const email = req.body.Email

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }]
  }

  const jsondata = JSON.stringify(data);


  const url = "https://us1.api.mailchimp.com/3.0/lists/b5ac90c488"

  const options = {
    method: "POST",
    auth: "sri1:bb491c42a2a5a15022acd415777bc804-us1"
  }

  const request = https.request(url, options, function(response) {

if(response.statusCode === 200){
  res.sendFile(__dirname + "/successful.html")
} else {
  res.sendFile(__dirname + "/failure.html")
}

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsondata);
  request.end();
});


app.post("/failure", function(req,res){
  res.redirect("/")
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server starts running on port 3000")
})



//API kEYS
//bb491c42a2a5a15022acd415777bc804-us1

//// ID:
//b5ac90c488
