const { parse } = require("csv-parse");
const fs = require("fs");

const results: Buffer[] = [];
fs.createReadStream("./kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data: Buffer) => {
    results.push(data);
  })
  .on("error", (error: any) => {
    console.log(error);
  })
  .on("end", () => {
    console.log(results);
    console.log("finished reading file");
  });
