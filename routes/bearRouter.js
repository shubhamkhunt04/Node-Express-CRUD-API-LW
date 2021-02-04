const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Bear = require("../models/bear");

const bears = express.Router();
bears.use(bodyParser.json());

bears
  .route("/")
  .get(async (req, res, next) => {
    const bears = await Bear.find({});
    res.json(bears);
  })
  .post(async (req, res, next) => {
    try {
      const bears = await Bear.create(req.body);
      res.json(bears);
    } catch (err) {
      console.log("Error", err);
    }
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation dose not support on /bears");
  })
  .delete(async (req, res, next) => {
    try {
      const bears = await Bear.remove({});
      res.json(bears);
    } catch (error) {
      console.log(error);
    }
  });

bears
  .route("/:bearId")
  .get(async (req, res, next) => {
    try {
      const bear = await Bear.findById(req.params.bearId);
      res.json(bear);
    } catch (error) {
      console.log(error);
    }
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /bears/" + req.params.bearId);
  })
  .put(async (req, res, next) => {
    try {
      const bear = await Bear.findByIdAndUpdate(
        req.params.bearId,
        { $set: req.body },
        { new: true }
      );
      res.json(bear);
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req, res, next) => {
    const bear = await Bear.findByIdAndRemove(req.params.bearId);
    res.json(bear);
  });

module.exports = bears;
