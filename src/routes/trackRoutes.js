const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const Track = require('../models/Track');

const router = express.Router();

router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find({ userId: req.user._id });

    res.send(tracks);
  } catch (error) {
    res.status(401).send({ error: 'The tracks for this user were not found.' })
  }
});

router.post('/', async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    res.status(422).send({ error: 'You must provide a name and locations.' });
  }

  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

module.exports = router;
