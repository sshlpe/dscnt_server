"use strict";

require('dotenv').config();


const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  axios = require("axios").default,
  app = express().use(body_parser.json());


app.listen(process.env.PORT || 8010, () => {
	console.log(` listening on ${process.env.PORT}`)
});


app.get("/", async (req, res) => {
	res.send('Hola mundo');
});