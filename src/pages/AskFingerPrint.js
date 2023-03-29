import { Link } from 'react-router-dom'
import React from 'react'
import  io  from 'socket.io-client'
let data = "";
let matched = false;
let once = true ; 

class AskFingerprint extends React.Component {

  state = {} ; 

  constructor(props){
    super(props);
    this.state = {
      message : "Waiting for valid Finger Print"
    }
  }
  async componentDidMount() {
    try {
      this.socket = await io('http://localhost:3002')
      this.socket.open();
      await this.socket.on('data', async (data1) => {
        console.log(data1);
        data = data1
       setTimeout(() => {} , 10);
if(!matched && data === 'a' &&once === true){
       this.socket.emit('data' , 'd')
       once = false ;
}
if(data === 'h'){
  matched = true ; 
  this.socket.emit('data' , 'a')
  this.socket.emit('data' , 'a')
  await setTimeout(() => {
    window.location.replace("/askfp")

  } , 1000);
  this.setState({ message : "Finger Print did not match"});
}
if(data === 'm'){
  this.setState({ message : "Please Remove Finger"});
}
if(data === 'i'){
  matched = true ; 
  this.socket.emit('data' , 'a')
  this.socket.emit('data' , 'a')
  await setTimeout(() => {
    window.location.replace("/candilist")
    
  } , 1000);
  this.setState({ message : "Finger Print matched"});
}
// if(data === 'n'){
//   this.setState({ message : "Waiting for valid Finger Print"});
// }

// if(id === ""){

//   if(data === 'a' ){
    
//      this.socket.emit('data' , 'b')
//      setTimeout(() => {} , 100);
//      this.socket.emit('data' , 'b')
//     }
//     if(data === 'o'){
//        this.socket.emit('data' , 'p')
//        setTimeout(() => {} , 100);
//     }
//       if(parseInt(data) > 999999){
//         id = data ; 
//         this.socket.emit('data' , 'a');
//   }
// }
// else{
//   // window.location.replace("/askfp")

// }
    })
      setTimeout(() => {} , 100);
      console.log("id is :" , id)
    
    } catch (error) {}
  }



  render() {
    return (
      <div className="row-2 ">
        <div className="bg-orange-500">

            {/* <Link
              to="/candilist"
              style={{ pointerEvents: 'none' }}
              className=" absolute right-3 top-5 flex w-max h-max bg-gray-300 text-xl font-bold rounded py-3 px-7  text-white"
            >
              Start
            </Link> */}
       
        </div>
   
        
        
        <div className=" flex justify-center items-center h-screen mx-auto  ">
          <div className="spinner-border animate-bounce inline-block w-11/12 px-5 text-center rounded-full">
            <h1 className=" text-2xl md:text-4xl font-semibold  mb-2 ">
              <span className="text-green-500  font-bold">
              {this.state.message}
              
              </span>
            </h1>
          </div>
        </div>
     

      </div>
    )
  }
}

export default AskFingerprint
