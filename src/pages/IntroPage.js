import { Link } from 'react-router-dom'
import React from 'react'
import  io  from 'socket.io-client'
import VotingMachine from '../abis/VotingMachine.json'
import Web3 from 'web3'


let data = "";
let id = "";
let downloadedFP = "3,3,82,32,20,1,44,1,133,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,121,0,0,0,0,3,51,204,255,255,243,255,255,239,251,187,190,234,170,170,166,86,101,85,101,149,86,85,81,85,68,68,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,88,133,24,94,59,135,16,62,51,8,169,126,51,15,230,62,44,20,225,222,104,34,17,254,118,166,166,30,110,39,17,254,80,43,22,94,91,48,85,190,76,52,86,62,63,60,22,62,111,189,168,222,87,10,134,127,101,139,200,223,78,159,169,31,80,135,193,220,78,47,171,188,91,63,106,60,61,143,42,29,95,21,78,186,90,151,34,26,97,60,83,218,99,191,148,90,81,186,20,187,62,32,93,24,64,165,90,152,76,187,105,184,78,24,31,217,79,153,157,25,64,34,130,25,76,61,84,217,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,78,32,0,1,32,1,133,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,119,0,0,0,0,3,51,204,255,255,255,255,255,191,238,238,251,170,170,106,165,153,89,85,150,85,85,85,21,84,68,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,82,132,152,190,53,134,16,158,45,7,105,222,44,142,166,158,37,19,162,62,96,33,210,94,110,38,166,126,101,166,210,94,71,170,86,190,82,47,214,30,66,179,150,158,53,59,22,158,101,189,105,62,80,138,6,223,95,11,137,63,70,158,233,127,74,135,2,60,69,46,236,28,81,62,234,156,55,14,42,125,88,20,207,26,83,150,162,122,87,59,212,58,89,191,20,186,72,57,85,27,54,31,93,120,56,164,90,248,66,186,170,24,70,151,96,57,72,24,221,121,56,33,130,121,66,60,149,57,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"; 
let alreadyVoted = false ; 
 


class Intro extends React.Component {
  state = {} ; 

  constructor(props){
    super(props);
    this.state = {
      message : "Insert your voting card"
    }
  }



   loadBlockchainData = async  () =>{
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const deployer = accounts[0];
    const abi = VotingMachine.abi ; 
    const address = VotingMachine.networks['5777'].address ; 
    console.log("token address : " , address);
    const votingMachine =  new web3.eth.Contract(abi , address);
    let result = 0 ;
  try {

//     const signedTransactionData  = await  web3.eth.accounts.signTransaction({
//       to: address,
//       value: 0,
//       gas: 2000000,
//       data : await votingMachine.methods.VerifyVoter(id).encodeABI()
//   }, '0a4dcca838bedf6b1e20c6d460c757c0c4213df8f4642a97d8ff863f976983cb')


// const result =  await web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction )


    console.log("verifying voter number : " , id )
     result =await votingMachine.methods.VerifyVoter(id).send({from: deployer});
     downloadedFP = (result.events.FingerPrint.returnValues[0]).toString() ; 
  
    
  } catch (error) {
    let data =(error.message).toString().slice(49 +93 , 49+93+20 )   ; 
    console.log("error is : " ,data );
    this.setState({ message : "Already Voted"});
    setTimeout(() => {} , 1000);

    alreadyVoted = true ; 

    // window.location.replace("/errors")

  }
    // console.log("error is : " ,  result);
  
  
  }
  
  async componentDidMount() {
    try {
      this.socket = await io('http://localhost:3002')
      this.socket.open();
      this.socket.emit('data' , 'a')

      await this.socket.on('data', async (data1) => {
        console.log(data1);
        data = data1
if(id === ""){

  if(data === 'a' ){
    
     this.socket.emit('data' , 'b')
    }
    if(data === 'o'){
       this.socket.emit('data' , 'p')
    }

      if(parseInt(data) > 999999){

        
        id = data ; 
        console.log("idd is : " , id )
        // await this.loadBlockchainData();

        this.socket.emit('data' , 'a');
  }
}
else {

    this.socket.emit('data' , 'a');

    if(data === 'a' ){
    
      this.socket.emit('data' , 'b')
     }
     if(data === 'o'){
        this.socket.emit('data' , 'p')
        setTimeout(() => {} , 10);

        this.socket.emit('data' , 'a')
     }

if(data === 'j'){
this.socket.emit('data' , 'a')
setTimeout(() => {} , 10);

this.socket.emit('data' , 'a')
window.location.replace("/")
}

    if(!alreadyVoted){

      this.setState({ message : "Processing"});

  this.socket.emit('data' , 'c'); 
  setTimeout(() => {} , 10);
  this.socket.emit('data' , 'o');
  setTimeout(() => {} , 10);
  if(data === 'p'){
    await this.loadBlockchainData();

    console.log("p received")
    console.log("fingerprint data is : " , downloadedFP);

    console.log("download FP LENGTH " , downloadedFP.length)
    for(let i = 0 ; i < downloadedFP.length ; i++){
      this.socket.emit('data' , downloadedFP[i].toString());
    }
  }

  if(data === 'g'){
    this.socket.emit('data' , 'a')
    this.socket.emit('data' , 'a')
    window.location.replace("/askfp")
  }

}
else{
  this.setState({ message : "Please Remove Your card"});

}
}
    })
      setTimeout(() => {} , 10);
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

export default Intro
