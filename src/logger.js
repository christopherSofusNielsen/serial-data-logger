//https://serialport.io/docs/api-parsers-overview
const fs = require("fs");
const SerialPort = require("serialport");
const ByteLength = require("@serialport/parser-byte-length");
const Delimiter = require("@serialport/parser-delimiter");
let cnt = 0;

const wstream = fs.createWriteStream("./data/data.csv", {
  flags: "a",
  encoding: "utf8",
});

const ts = new Date();
wstream.write(`\n${ts.toString()}\n`, () => {
  const port = new SerialPort("COM4", {
    baudRate: 57600,
    //baudRate: 125000,
  });

  //const parser = port.pipe(new ByteLength({ length: 2 }));
  const parser = port.pipe(
    new Delimiter({ delimiter: "\n", includeDelimiter: true })
  );

  port.on("error", (err) => {
    console.log("Error", err);
  });

  parser.on("data", (data) => {
    //console.log(data.toString());
    wstream.write(data.toString());
    // console.log(data.readUIntBE(0, 2));
    // wstream.write(data.readUIntBE(0, 2).toString() + "\n");
  });
});
