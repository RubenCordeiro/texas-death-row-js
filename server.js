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

// Texas <td> elements index via cheerio, might have to update if Texas updates their site
var INDEX_COUNTY = 19;
var INDEX_RACE = 17;
var INDEX_DATE = 15;
var INDEX_AGE = 13;
var INDEX_TDCJ = 11;
var INDEX_FIRST_NAME = 9;
var IDNEX_LAST_NAME = 7;
var INDEX_EXECUTION_NUMBER = 1;
var INDEX_LAST_WORDS_HREF = 5;
// constants
var LAST_WORDS_URL_BASE = "http://www.tdcj.state.tx.us/death_row/";

var people = [];

app.get('/scrape', function(req, res){
  var url = "http://www.tdcj.state.tx.us/death_row/dr_executed_offenders.html";
  request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var people = [];
            var entries = $("tr");
            for (var i = 1; i < entries.length; i++) {
            	var children = entries[i].children;
            	var current_person = person();
            	current_person.county = children[INDEX_COUNTY].children[0].data;
            	current_person.race = children[INDEX_RACE].children[0].data;
            	current_person.date = children[INDEX_DATE].children[0].data;
            	current_person.age = children[INDEX_AGE].children[0].data;
            	current_person.TDCJ_number = children[INDEX_TDCJ].children[0].data;
            	current_person.firt_name = children[INDEX_FIRST_NAME].children[0].data;
            	current_person.last_name = children[IDNEX_LAST_NAME].children[0].data;
            	current_person.execution_number = children[INDEX_EXECUTION_NUMBER].children[0].data;
                var lastwords = LAST_WORDS_URL_BASE + children[INDEX_LAST_WORDS_HREF].children[0].attribs["href"];
                
                console.log(lastwords);
                //console.log(entries[i].children[3].name);
                //console.log(lastwords);
                //people.push(current_person);
                //break;
            }

		}
	});	
});
app.listen('8081');
console.log('talk to localhost::8081/scrape to generate data');
exports = module.exports = app;