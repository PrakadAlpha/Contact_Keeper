const express = require('express');
const User = require('../models/User')
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config')

const router = express.Router();

router.post('/', [
  check('name', "Name is required").not().isEmpty(),
  check('email', "Please include valid email").isEmail(),
  check('password', "Please enter password with 6 or more characters").isLength({min: 6})
],async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {name, email, password} = req.body;

  try {

    let user = await User.findOne({email});
  
    if(user){
      return res.status(400).json({message: 'User already exist'});
    }

    user = new User({
      name, email, password
    })

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
  } 

});

module.exports = router;