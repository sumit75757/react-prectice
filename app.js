const express = require("express");
const morgen = require('morgan');
const bodyParser = require('body-parser');
const produst = require('./api/routes/products');
const app = express();
const mongoos = require('mongoose');
const user = require("./api/routes/users");
const auth = require("./api/routes/auth");
const todos =require('./api/routes/todo')
const email = require("./api/routes/send_email");
const feed = require("./api/routes/post");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const authchack = require("./api/Middleware/chack-auth")
require("dotenv").config();


const { PORT, MONGODB_URI, NODE_ENV,ORIGIN,JWT_SECRET } = require("./config");
// const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./errors");

mongoos.connect(MONGODB_URI)
.then(
res=>{
    console.log('database conected');
    console.log("http://localhost:"+PORT+"/");
}
).catch(
    err =>{
        console.log("database not conected",err);
    }
)
app.use(morgen('dev'))


// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cors({
    origin:"*"
}))
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});




// app.use((res,req,next)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if (req.method === "OPTIONS") {
//       res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//       return res.status(200).json({});
//     }
//     next();
// }
// )
/////////////routes////////////////
// app.use('/api', jwt({
//     secret: config.sessionSecretKey,
//     fail: function (req, res) {
//       if (!req.headers.authorization){
//         res.send(401, 'missing authorization header');
//       }
//       res.send(401);
//     }
//   }));
app.use('/auth', auth)
app.use('/email', email)
app.use('/api/products', produst);
app.use('/api/user', user);
app.use('/api/todo', todos);
app.use('/api/feed', feed);
app.use('/uplode',express.static('uplode'));
app.use('/feeds',express.static('feeds'));


app.use( authchack, (res,req,next)=>{
    
    const err = new Error('404 Not Found');
    err.status = 404;
    next(err);
})

app.use((res,req,next)=>{
    const err = new Error('404 Not Found');
    err.status = 404;
    next(err);
})

app.use( (err, req, res, next)=> {

  res.status(err.status || 500)
  res.json(
      {
          error:{
              message:err.message
          }
      }
  )
});

module.exports = app;

 // mongodb+srv://Sumitpatel:<password>@cluster0.nt5gi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
