const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate')
const leaders = require('../models/leaders');
const cors = require('./cors');


const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, (req, res, next) => {
    Leaders.find(req.query)
      .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    leaders.create(req.body)
      .then((leader) => {
        console.log('leader Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
  })
  .delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    leaders.remove({})
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

leaderRouter.route('/:leaderId')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, (req, res, next) => {
    leaders.findById(req.params.leaderId)
      .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
  })
  .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    leaders.findByIdAndUpdate(req.params.leaderId, {
      $set: req.body
    }, { new: true })
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    leaders.findByIdAndRemove(req.params.leaderId)
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = leaderRouter;
