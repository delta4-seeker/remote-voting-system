


const { SerialPort } = require('serialport');
const serialPort = new SerialPort({
path: 'COM4',
baudRate: 9600,
dataBits: 8,
stopBits: 1,
parity: 'none',
});



serialPort.on("open", function() {
  console.log("-- Connection opened --");
  serialPort.on("data", function(data) {
    console.log("Data received: " + data);
  });
});