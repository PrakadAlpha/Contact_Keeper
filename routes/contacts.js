const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact')
const {check, validationResult} = require('express-validator');
const auth= require('../middlewares/auth')

router.get('/', auth, async (req, res) => {

  try {
    const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
    res.status(200).json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal error");
  }

});

router.post('/', [auth, [
  check('name','name is required').notEmpty()
]],async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {name, email, phone, type} = req.body;

  try {
    
    const newContact = new Contact({name, email, phone, type, user: req.user.id});
    
    const contact = await newContact.save()

    res.status(200).json(contact);

  } catch (err) {
    res.status(500).send("Server error");
  }

});

router.put('/:id', auth, async (req, res) => {
  const {name, email, phone, type} = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({message: 'Contact not found'});

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({message: 'Not authorized'});
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {$set: contactFields},
      {new: true},
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({message: 'Contact not found'});

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({message: 'Not authorized'});
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({message: 'Contact removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');

  }
});

module.exports = router;