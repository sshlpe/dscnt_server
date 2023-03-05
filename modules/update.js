
const {dsc_falabella} = require('./scrappers');
const dsc_json = require('../src/db/discounts.json');
const fs = require("fs");

const runUpdate = async () => {
	// reestart the json file
	console.log(dsc_json);

	let json = {};
	for (let key in dsc_json) {
		json[key] = [];
	}

	json['falabella'] = await dsc_falabella();


	fs.writeFile("./src/db/discounts.json", JSON.stringify(json), (err) => {
	  if (err) {
	    console.error(err);
	    return;
	  }
	  console.log("Discounts written to discounts.json");
	});

};

module.exports = {
  runUpdate
}