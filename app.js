const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");


// var http=require('http');
// var server=http.createServer(function(req,res){
//     res.end('test');
// });

// server.on('listening',function(){
//     console.log('ok, server is running');
// });

// server.listen(4000);


app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: 'iamasecret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:3600000
    }
}));

//Routes
/*  Routes Format
    const name = require("file directory");
    app.use("/",name);
    app.use() first parameter will act as the url path
*/

const login = require("./public/router/clientlogin.js");
app.use("/clientlogin",login);

const landing = require("./public/router/landing.js");
app.use("/",landing);

const gallery = require("./public/router/gallery.js");
app.use("/gallery",gallery);

const clientui = require("./public/router/clientui.js");
app.use("/client",clientui);

const admin = require("./public/router/admin.js");
app.use("/admin",admin);

app.post("/logout",(req,res)=>{
    req.session.destroy(err =>{
        if(err){
            return res.redirect("/client");
        }
        res.clearCookie()
        res.redirect("/");
    })
});

app.listen(4000,"0.0.0.0",()=>{
    console.log("Connected to port 4000");
});
