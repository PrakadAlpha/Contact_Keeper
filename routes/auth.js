const express = require('express');
const User = require('../models/User')
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth= require('../middlewares/auth')

const router = express.Router();

router.get('/', auth ,async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({data: user});
  } catch (err) {
    res.status(401).json({error: "No authorized"});
  }

});

router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please include a password').exists()
],async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {email, password} = req.body;

  try {

    let user = await User.findOne({email});

    if(!user){
      return res.status(404).json({message: 'Invalid Creds..'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({message: 'Invalid Creds..'});
    }

    const payload = {
      user:{
        id: user.id
      }
    }

    jwt.sign(payload, config.get('secret'), {expiresIn: 360000}, (err, token) =>{
      return res.json({token});
    })

  } catch (err) {
    console.log(err.message);
    res.status(500).json({error: 'Internal server error'});
  }
  

});

module.exports = router;