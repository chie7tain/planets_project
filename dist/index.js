"use strict";
var parse = require("csv-parse").parse;
var fs = require("fs");
var habitablePlanets = [];
function isHabitablePlanet(planet) {
    // @ts-ignore
    return (planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6);
}
fs.createReadStream("./kepler_data.csv")
    .pipe(parse({
    comment: "#",
    columns: true,
}))
    .on("data", 
// @ts-ignore
function (data) {
    if (isHabitablePlanet(data)) {
        habitablePlanets.push(data);
    }
})
    .on("error", function (error) {
    console.log(error);
})
    .on("end", function () {
    console.log(habitablePlanets.map(function (planet) {
        return planet["kepler_name"];
    }));
    console.log("Found " + habitablePlanets.length + " habitable planets.");
    console.log("finished reading file");
});
