"use strict";

require('dotenv').config();

const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  puppeteer = require('puppeteer'),
  {runUpdate} = require('./modules/update'),
  cors = require('cors'),
  app = express().use(body_parser.json()).use(cors());


app.listen(process.env.PORT || 8010, () => {
	console.log(` listening on ${process.env.PORT}`)
});

app.get("/update", async (req, res) => {
	runUpdate();
	res.send('Updateing discounts database.. This may take a while');
});

app.get("/", async (req, res) => {
	res.send("Hi This is My Api");
});

app.get("/discounts/:elements", async (req, res) => {

	let dsc_json = require('./src/db/discounts.json');

	const elements = req.params.elements.split(",");
	let info = {};
	for (let elm of elements){
		info[elm] = dsc_json[elm];
	}
	res.send(info);
});

app.get("/entities", async (req, res) => {
	let ent_json = require('./src/db/entities.json');
	res.send(ent_json);
});



