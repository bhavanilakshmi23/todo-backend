const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRound = 10;

let hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}


let comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password,hashedPassword)
}


let createToken = async ({ email,name, _id }) => {
    let token = await jwt.sign(
        { email,  name, id: _id },
        process.env.JWT_SK,
        { expiresIn: process.env.JWT_EXPIRE }
    )
    return token
}

let decodeToken = async (token) => {
    return jwt.decode(token)
}

let validate = async (req,res,next)=>{//validate if token is not expired
    let token = req?.headers?.authorization?.split(" ")[1]
    if(token)
    {
        let exp = await decodeToken(token)
        if((Math.round((+new Date()/1000)))<exp)
            next()
        else
            res.status(401).send({message:"Token Expired"})
    }
    else
        res.status(401).send({message:"Token Not Found"})
}

module.exports={createToken,validate,hashPassword,comparePassword}