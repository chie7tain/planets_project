"use strict";
var parse = require("csv-parse").parse;
var fs = require("fs");
var results = [];
fs.createReadStream("./kepler_data.csv")
    .on("data", function (data) {
    results.push(data);
})
    .on("error", function (error) {
    console.log(error);
})
    .on("end", function () {
    console.log(results);
    console.log("finished reading file");
});
