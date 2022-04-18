const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../../config");

module.exports= (req, res, next)=>{
    try {
        if (req.headers.authorization != '') {
            console.log("eeee");
            const token =  req.headers.authorization.split(" ")[1];
            console.log(token);
            const decode = jwt.verify(token,JWT_SECRET);
            req.userData = decode;
        }
        
        next();
    } catch (error) { 
        // res.status(401).json(
        //     {  
        //         message:'auth fail'
        //     }
        //   );
        // console.log(error);
        const err = new Error('401 Not Found');
        err.status = 401;
        next(err);
    } 

}