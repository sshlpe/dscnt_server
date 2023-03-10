
const {dsc_falabella, dsc_mach} = require('./scrappers');
const fs = require("fs");

const runUpdate = async () => {
	const dsc_json = require('../src/db/discounts.json');
	// reestart the json file
	let json = {};
	for (let key in dsc_json) {
		json[key] = [];
	}

	json['Falabella'] = await dsc_falabella();
	json['MACH'] = await dsc_mach();


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