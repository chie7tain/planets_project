"use strict";
var parse = require("csv-parse").parse;
var fs = require("fs");
var results = [];
fs.createReadStream("./kepler_data.csv")
    .pipe(parse({
    comment: "#",
    columns: true,
}))
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
