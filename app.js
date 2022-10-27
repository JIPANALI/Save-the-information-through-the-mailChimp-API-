//jshint esversion: 6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");
});


app.post("/", function(req,res){
  const firstName=req.body.fName;
  const lastName=req.body.lName;
  const email=req.body.email;
  const data={
    members:[
      {
      email_address:email,
      status:"subscribed",
      merge_fields:
      {
        FNAME:firstName,
        LNAME:lastName
      }
    }


    ]
  };

  const jsonData=JSON.stringify(data);

  const url="https://us21.api.mailchimp.com/3.0/lists/f4a736a5d4";
  const options={
    method:"POST",
    auth:"jipanali1011@gmail.com:59c0f0b4c0595d55b6308236200d5449-us21"
  }

const request=https.request(url, options,function(response){

  if (response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }
  else {
    res.sendFile(__dirname+"/failure.html");
  }

  response.on("data",function(data){
    console.log(JSON.parse(data));
  })

})

request.write(jsonData);
request.end();

});

// for try again redirect page
app.post("/failure",function(req,res){
  res.redirect("/");
});


// for heroku dynamic port define by using this -- process.env.PORT

// if want to both local and as well as works in huroku then you have define like ||
app.listen(process.env.PORT || 3000,function(){
  console.log("our server is running  jip");
});

// for you have create Procfile not with the any extension file






//Api key--   59c0f0b4c0595d55b6308236200d5449-us21



//list or audiencew id--  f4a736a5d4
