const express = require('express');
const router = express.Router()
const { createToken, validate, hashPassword, comparePassword } = require('../auth')
const mongoose = require("mongoose")
const { dbUrl } = require('../dbConfig')
const {TodoModel}=require('../schema/TodoSchema')


mongoose.connect(dbUrl)

router.get('/all',  async (req, res) => {
  try {
   
    const data = await TodoModel.find()
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/_id',  async (req, res) => {
  try {
     const { id } = req.params;
      const data = await TodoModel.findOne({ id: id });
// Send the data as JSON response
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/_id', async (req, res) => {
  try {
 
 const { id } = req.params;
      const data = await TodoModel.deleteOne({ id: id });
 res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/addtodo', async (req, res) => {
  try {
    
      const newtodo= req.body;
      const data = await TodoModel.insertMany(newtodo);

    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/_id',  async (req, res) => {
  try {
const { id } = req.params;
      const updatetodo = req.body;
      const data = await TodoModel.updateOne({id:id},{$set: updatetodo});
 // Send the data as JSON response
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports=router