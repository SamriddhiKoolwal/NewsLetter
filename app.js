const express=require('express');
const app=express();
const request=require('request');
const https=require('https');
const bodyParser=require('body-parser');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/Sign-up.html");
})




app.post('/',(req,res)=>{
  const Fname=req.body.first;
  const Lname=req.body.last;
  const email=req.body.email;
  //console.log(Fname+" "+" "+Lname);
 const data ={
   members:[{
     email_address:email,
     status:"subscribed",
     merge_fields:{
       FNAME:Fname,
       LNAME:Lname,
     }
   }]
 };
 const jsonData=JSON.stringify(data);
const url="https://us2.api.mailchimp.com/3.0/lists/e2e860183d";
  const options={
    method:"POST",
    auth:"sam1:17bd91923fdc8ed32c061fbee6b82e0-us2"
  }
 const request=https.request(url,options ,function(response){
   if(response.statusCode===200){

     res.sendFile(__dirname+"/sucess.html");
   }else{
     res.sendFile(__dirname+"/failure.html");

   }



   response.on("data",function(data){
     console.log(JSON.parse(data));
   })
 })
 request.write(jsonData);
 request.end();
});

app.post("/failure",function(req,res){
  console.log("clicked");
  res.redirect('/')
});





//4714fbf964d6c068c3c954a5c6cdcff5-us2-----api id


//e2e860183d==list


app.listen(3000,()=>{
  console.log("ready!!!!");
})
