const mongoose = require('mongoose')

function validateEmail(e) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e);
}

function validateMobile(e) {
    let result = true;
    for (let i = 0; i < e.length; i++){
        if (Number(e[i] == e[i]))
        {
            continue;
        } else
        {
            result = false;
            break;
            }
    }
    return result
}

let UserSchema = new mongoose.Schema({
    name: { type: String, reuired: true },
    email: {
        type: String, reuired: true, validate: {
            validator: validateEmail, message: "Invalid Email"
        }
    },
    mobile:{
        type: String, reuired: true, validate: {
            validator: validateMobile, message: "Invalid Mobile"
        }
    },
    password: { type: String, reuired: true },
    createdAt:{type: Date,default:Date.now()}
},
    {collection:'Users',versionKey:false}

)

let UserModel = mongoose.model('Users', UserSchema)

module.exports={UserModel}