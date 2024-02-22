const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const { dbUrl } = require('../dbConfig')
const { UserModel } = require('../schema/UserSchema')
const { createToken, validate, hashPassword, comparePassword } = require('../auth')


mongoose.connect(dbUrl)


router.get('/all', validate, async (req, res) => {
    try {
        let users=await UserModel.find()
        res.status(200).send({
            message: "Data Fetch Successfull",
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
})


router.post('/signup', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if(!user)
        {
            req.body.password = await hashPassword(req.body.password)
            let newUser = await UserModel.create(req.body)
            res.status(200).send({
                message:"User Created Successfully"
            })
        }
        else {
            res.status(400).send({ messaage: `User with ${req.body.email} already exits`})
        }

    } catch (error) {
        res.status(500).send({
            message: "Internal Serveer Error",
            error:error?.message
        })
    }
})


router.post('/signin', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            if (await comparePassword(req.body.password, user.password)) {
                let token = await createToken(user)
                res.status(200).send({
                    message: "Login Successfull", token
                })
            } else {
                res.status(400).send({ message: "Invalid Credentials" })
            }
        
        } else {
            res.status(400).send({ message: `User with ${req.body.email} does not exits` })
        }
    }
    catch (error) {
         res.status(500).send({
            message: "Internal Serveer Error",
            error:error?.message
        })
    }
})


router.post('/change-password/:id', validate, async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.id)
        if (user) {
            if (await comparePassword(req.body.current_password, user.password)) {
                user.password = await hashPassword(req.body.new_password)
                user.save()
                res.status(200).send({
                    message:"Password Changed Successfully"
                })
            } else {
                res.status(400).send({
                    message:"Invalid Current Password"
                })
            }

        } else {
            res.status(400).send({
                message: `User with  does not exits` 
            })
        }
    } catch (error) {
         res.status(500).send({
            message: "Internal Serveer Error",
            error:error?.message
        })
    }
})


router.get('/:id', validate, async (req, res) => {
    try {
        let data = await UserModel.findById(req.params.id) 
        if (data)
        {
            res.status(200).send({
                message: "Data Fetch Succesfull",
                data
            })
        } else {
            res.status(400).send({message:'Invalid Id'})
            }
    } catch (error) {
         console.log(error)
        res
        .status(500)
        .send({
                message:"Internal Server Error"
            })
    }
})


module.exports=router