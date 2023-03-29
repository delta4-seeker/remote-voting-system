import  { SerialPort } from 'serialport';
import { ReadlineParser } from'@serialport/parser-readline';
const port = new SerialPort({ path: 'COM4', baudRate: 9600 })

const id  = 0 ; 


const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))




parser.on('data', (data) => {
    console.log(data);
    if(data === 'o'){
      port.write('p', function(err) {
        if (err) {
          return console.log('Error on write: ', err.message)
        }
        console.log('p written')
      }); 
    }
    if(parseInt(data) > 999999999999999) {
        console.log("the data is : " , data);
        port.write('a', function(err) {
            if (err) {
              return console.log('Error on write: ', err.message)
            }
            console.log('a written')
          });   
        }
      })
  

  setTimeout(() => {

    port.write('b', function(err) {
        if (err) {
          return console.log('Error on write: ', err.message)
        }
        console.log('b written')
      })



    
    
  },3000)
