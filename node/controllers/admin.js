const express = require('express');
const Router = express.Router();
const registerModel = require('../schema/adminSchema');
const adminModel = require('../schema/adminSchema');
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

//Register
Router.post('/register', async (req, res) => {

    const username = req.body.userName
    const email = req.body.registerEmail
    const password = req.body.registerPassword

    if (!username && !email && !password) {
        return res.status(200).send("Please fill all the fields")
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newRegister = new registerModel({
        username: username,
        email: email,
        password: hashedPassword,
    });

    try {
        const register = await newRegister.save();
        console.log("------REGISTER----------", register);
        if (!register) {
            res.status(400).send("Internal server error");
        } else {
            res.status(200).send("REGISTER added successfully");
        }
    } catch (error) {
        console.error('Error adding register:', error);
        res.status(500).send("Internal server error");
    }
});

//Login
Router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const admin = await adminModel.findOne({ email:email });
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const brypted = bcrypt.compareSync(password, admin.password)

    const token = jwt.sign({ email: admin.email }, 'SecretKey', {
      expiresIn: '1h', 
    });
  
    return res.status(200).json({ token:token,email:email });
  });
  
module.exports = Router;
