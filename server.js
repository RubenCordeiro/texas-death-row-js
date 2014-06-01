// useful and relavent tutorial http://scotch.io/tutorials/javascript/scraping-the-web-with-node-js
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var person = function() {
	return {
		execution_number: "",
		last_words: "",
		firt_name: "",
		last_name: "",
		TDCJ_number: "",
		age: "",
		date: "",
		race: "",
		county: ""
	};
}


app.get('/scrape', function(req, res){
  var url = "http://www.tdcj.state.tx.us/death_row/dr_executed_offenders.html";
  request(url, function(error, response, html){
        if(!error){
            


            var $ = cheerio.load(html);
            var people = [];
            var entries = $("tr");
            for (var i = 1; i < entries.length; i++) {
            	var listing = entries[i];
            	var current_person = person();
            	current_person.county = listing.children[19].children[0].data;
            	current_person.race = listing.children[17].children[0].data;
            	current_person.date = listing.children[15].children[0].data;
            	current_person.age = listing.children[13].children[0].data;
            	current_person.TDCJ_number = listing.children[11].children[0].data;
            	current_person.firt_name = listing.children[9].children[0].data;
            	current_person.last_name = listing.children[7].children[0].data;
            	current_person.execution_number = listing.children[1].children[0].data;
            	
            	console.log(current_person);
            	break;
            }
		}
	});	
});
app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;