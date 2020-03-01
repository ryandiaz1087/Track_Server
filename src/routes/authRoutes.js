const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });

  try {
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.send({ token });
  } catch (error) {
    res.status(422).send(error)
  }
});

module.exports = router;