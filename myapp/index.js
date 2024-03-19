const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken")
const con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "root123",
   database: "nodejs",
 });
 con.connect(function(err) {
   if (err) throw err;
   app.listen(4000,()=>{
       console.log("Server started at 4000 port");
   })
 });


// GET user list

app.get("/users",async (request,response) => {
 //sconsole.log(request)
 const dbQuery = `select * from  users ORDER BY id;`;
  await con.query(dbQuery,(err,data) => {
   if (err) {
     console.log("error",err);
   }
   else {
   response.send(data);}
 });
});

// Add user API
app.post("/newuser",async (request,response) => {
 console.log(request.body)
 const{name,username,password} = request.body;
 const hashpassword = await bcrypt.hash(password,10);
 const checkUser = `SELECT * FROM users where username="${username}"`;
 await con.query(checkUser,(err,res) => {
  if (err){
    console.log('errr',err);
  }
  else{
    if (res.length===0) {
     const addUser=`INSERT INTO users (name,username,password) VALUES ("${name}","${username}","${hashpassword}") `;
     con.query(addUser,(err,res) => {
      if (err){
        response.send("Error",err);
      }
      response.send("Uer Has been added succesfully");
     })
    }
    else{
      response.send("User Already Exist");
    }
  }
});
});


// Update user's Name and Password 
app.put("/updateuser",async (request,response) => {
  const{name,username,password} = request.body;
  const hashpassword = await bcrypt.hash(password,10);
  const checkUser = `SELECT * FROM users where username="${username}"`;
  
 await con.query(checkUser,(err,result) => {
  if (err) {
    response.send("Error in databse" + err);
  }
  else{
    if (result.length==1){
      const updateUser = `UPDATE users SET name="${name}", username="${username}", password="${hashpassword}" WHERE username="${username}"`;
      con.query(updateUser,(err,result)=>{
        if (err) throw err;
        response.send("User information has been Updated successfully");
      });
    }
    else{
      response.send("Username does not exist")
    }
  }
  
  
});
});
// Delete User

app.delete("/deleteuser",async (request,response) => {
  const{name,username,password} = request.body;
  const checkUser = `SELECT * FROM users where username="${username}"`;
  
 await con.query(checkUser,(err,result) => {
  if (err) {
    response.send("Error in databse" + err);
  }
  else{
  
    if (result.length==3){
      const deleteUser = `DELETE FROM users WHERE username="${username}"`;
      con.query(deleteUser,(err,result)=>{
        if (err) throw err;
        response.send("User has been deleted successfully");
      });
    }
    else{
      response.send("Username does not exist")
    }
  }
  
  
});
});
