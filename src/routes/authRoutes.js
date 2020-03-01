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

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password.' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: 'Email not found.' });
    }

    await user.comparePassword(password);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.send({ token });
  } catch (error) {
    res.status(422).send({ error: 'Invalid password or email.' })
  }


})

module.exports = router;