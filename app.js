var express=require('express');
var path=require('path');
var app=express();
var fs=require('fs');
var mysql=require('mysql');
var bodyParser=require('body-parser');

var con=mysql.createConnection({
    host:"localhost",
    password:"",
    user:"root",
    database:"login"
});
//////////////////////////////

//////connect mysql
con.connect(function(err){
if(err){
    console.log('error!');
}else
console.log('Connected');
});
////////////////////

app.use(express.static(path.join(__dirname , '/public')));


app.post('/details1',function(req,res){

   var Email=req.body.mail1;
   var  Password=req.body.password1;

con.query('SELECT * FROM mytable WHERE Email=? ',[Email],function(error,rows,fields){
    if(error){
        console.log('error in matching');
    }
    else {
       if(rows.length>0){ 
            if(Password==rows[0].Password){
            console.log('success');
                res.send('Login Successful!');
            }else
             {
            console.log('email and password dont match');
            res.send('Wrong Password!');
             }
        }   
      else{
        console.log("email is not present");
        res.send('You haven\'t registerd! Sign up first!');    
         }
        }   
    });
});
app.post('/details',function(req,res){
    var newuser={
    Name:req.body.user,
    Email:req.body.mail,
    Password:req.body.password
}
con.query('INSERT INTO mytable SET?',newuser,function(error,resp){
if(error){
    console.log('error in query');
    res.send('Enter proper values!');
}else
{
    console.log('Values inserted');
    res.send('Welcome! You have successfully registered!');
}
});
});

app.listen('2000');