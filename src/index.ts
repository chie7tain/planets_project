const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets: {
  [x: string]: string | number;
  // @ts-ignore
  x?: string | undefined;
  number?: any;
}[] = [];
function isHabitablePlanet(planet: {
  [x: string]: string | number;
  // @ts-ignore
  x?: string;
  number?: any;
}): boolean {
  // @ts-ignore
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
fs.createReadStream("./kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on(
    "data",
    // @ts-ignore
    (data: { [x: string]: string; x?: string | undefined; number?: any }) => {
      console.log(data);
      if (isHabitablePlanet(data)) {
        habitablePlanets.push(data);
      }
    }
  )
  .on("error", (error: any) => {
    console.log(error);
  })
  .on("end", () => {
    console.log(habitablePlanets);
    console.log("finished reading file");
  });
