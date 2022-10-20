const express = require('express')
const morgan = require('morgan')
const connect = require('../connect')
const {json, urlencoded} = require('body-parser')
const app = express()
const User = require('./user');

const router = express.Router();

app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(json())

app.use('/api/v1', router);

router.route('/users')
  .get(async (req, res) => {
    const users = await User.find({}).exec();
    res.status(200).json(users);
  })
  .post(async (req, res) => {
    const userDetails = req.body.user;
    try {
      const user = await User.create(userDetails);
      res.status(201).json(user.toJSON())
    } catch (e) {
      res.status(400).send(e);
    }
  })

router.route('/users/:id')
  .get(async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId).exec();
    res.status(200).json(user);
  })
  .delete(async (req, res) => {
    const userId = req.params.id
    try {
      const user = await User.findByIdAndRemove(userId).exec();
      res.status(200).json({removedUser: user.toJSON()});
    } catch (e) {
      res.status(400).send(e);
    }
  })
  .put(async (req, res) => {
    const userDetails = req.body.user;
    const userId = req.params.id
    try {
      const user = await User
        .findByIdAndUpdate(userId, userDetails, {new: true})
        .exec()
      res.status(201).json(user.toJSON())
    } catch (e) {
      res.status(400).send(e);
    }
  })

connect('mongodb://localhost:27017/introMongo')
  .then(() => app.listen(3000, () => {
    console.log('server on http://localhost:3000')
  }))
  .catch(e => console.error(e))
