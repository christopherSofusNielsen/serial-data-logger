//https://serialport.io/docs/api-parsers-overview
const fs = require("fs");
const SerialPort = require("serialport");
const ByteLength = require("@serialport/parser-byte-length");
let cnt = 0;

const wstream = fs.createWriteStream("./data/data.csv", {
  flags: "a",
  encoding: "utf8",
});

const ts = new Date();
wstream.write(`\n${ts.toString()}\n`, () => {
  const port = new SerialPort("COM5", {
    baudRate: 57600,
  });

  const parser = port.pipe(new ByteLength({ length: 2 }));

  port.on("error", (err) => {
    console.log("Error", err);
  });

  parser.on("data", (data) => {
    console.log(data.readUIntBE(0, 2));
    wstream.write(data.readUIntBE(0, 2).toString() + "\n");
  });
});
