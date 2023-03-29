import swastik from '../images/swastik.png'
import cat from '../images/cat.jpg'
import fox from '../images/fox.jpg'
import koala from '../images/koala.jpg'
import lemur from '../images/lemur.jpg'
import panda from '../images/panda.jpg'
import owl from '../images/owl.jpg'
import wolf from '../images/wolf.jpg'
import parrot from '../images/parrot.jpg'
import lion from '../images/lion.jpg'
import dog from '../images/dog.jpg'
import React from 'react'
import Errors from './Error'
import Complete from './Complete'
import { Link } from 'react-router-dom'
import Web3 from 'web3'
 
let id = 0 ; 
let data = "" ; 
let complete = false ; 
import  io  from 'socket.io-client'


import VotingMachine from '../abis/VotingMachine.json'
let candidateList = []; 

     let candidateIcons =  [
      cat,dog,lion,parrot,wolf,owl,panda,lemur,koala,fox
    ]
class Candilist extends React.Component {
  state = {}
  
  constructor(props) {
    console.log(props);
    super(props)

    this.state = {
      selectedCandidate: '',

      candidates: [
      ],
    }

  }


  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const candidates = [
      // "0xBa6Ae8617154f3874F6D61226545519bDc5CC372" , 
      // "0x2E3093dcd8FD66a3fc51990fCd04AF0f42Efc4c5" , 
      "0x02aa41C2c64D75D9c2C5F8E1330Fe0eaE1F7fC73" , 
      "0x16f90d915fDE7541DFD1902f88F98F8253150972" , 
      "0x0EdF55f1456a9ed6729FFaca23bf4E17cA6aa447" , 

    ]
    const deployer = accounts[0];
    const abi = VotingMachine.abi ; 
    const address = VotingMachine.networks['5777'].address ; 
    console.log("token address : " , address);
    const votingMachine =  new web3.eth.Contract(abi , address)
    candidateList = [];

//   for(let i = 0 ; i < candidates.length ; i++ ){
//     await votingMachine.methods.AddCandidate(candidateIcons[i]).send({
//       from: deployer,
//     })
//     console.log('Candidate added : ', candidateIcons[i])  
// }


     let result = await votingMachine.getPastEvents('CandidateList' , {    fromBlock: 0,
      toBlock: 'latest',} );
      console.log("result : " , result );
    
      result.map(items => {
         candidateList.push( {
          "candidate" : items.returnValues.id, 
          "image" :  items.returnValues.symbol,
         });
      
      })
      console.log("image : " , candidateList[0].image );
      console.log("owl : " , owl );
    this.setState({ candidates : candidateList})
    // let Fetchedbalance = await voteToken.methods.balanceOf(this.state.account).call() ; 
    // this.setState({ balance : Fetchedbalance})
    // console.log("balance : " , Fetchedbalance);   
  }

  
  async selectCandidate(candidate) {

    this.setState({ selectedCandidate: candidate })
   console.log(this.state.selectedCandidate)
 }
 async handleConfirm() {
   this.setState({ message: 'processing' })

     const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
     await window.ethereum.enable();
     const accounts = await web3.eth.getAccounts();
     const deployer = accounts[0];
     const abi = VotingMachine.abi ; 
     const address = VotingMachine.networks['5777'].address ; 
     console.log("token address : " , address);
     const votingMachine =  new web3.eth.Contract(abi , address)
     const result1 = await votingMachine.methods.TokenName()
     console.log("result1 : " , result1)
     console.log("candidate account is ",this.state.selectedCandidate.candidate);


     if(!complete){

      const signedTransactionData  = await  web3.eth.accounts.signTransaction({
        to: address,
        value: 0,
        gas: 2000000,
        data : await votingMachine.methods.Vote( this.state.selectedCandidate.candidate , id).encodeABI()
    }, '9cc055f936350545af35ad7b63aa7b9d01e1a1a7ac12a47f619d6f5eee040961')
  

  const result =  await web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction )


      console.log("voting of voter number : " , id )
        //  let result = await votingMachine.methods.Vote( this.state.selectedCandidate.candidate , id).send({
        //    from : deployer , 
        //    gas : 999999 
        //  })
         console.log(result);
         window.location.replace("/")
    complete = true 
         
    }

 
   
   this.setState({ message: 'complete' })
   window.location.replace("/complete")


 }


  async componentDidMount() {
    await this.loadBlockchainData() ; 
    try {
      this.socket = await io('http://localhost:3002')
      this.socket.open();
      this.socket.emit('data' , 'a')
      await this.socket.on('data', async (data1) => {
        // console.log(data1);
        data = data1


        if(id === 0){

  if(data === 'a' ){
    
     this.socket.emit('data' , 'b')
    }
    if(data === 'o'){
       this.socket.emit('data' , 'p')
    }

      if(parseInt(data) > 999999){

        
        id = data ; 
        
        this.socket.emit('data' , 'a');
  }
}
else {
  this.socket.emit('data' , 'a');

}
    });
     } catch (error) {
      console.log("error is : " , error)

       this.setState({ message: 'rejected' })
       window.location.replace("/errors")

       
     }
  }


  render() {


      return (
        <div className="m-10">
         <ul className="flex justify-between">
            <li className="mr-3">
              <Link
                className="text-center block text-3xl rounded py-3 px-7   text-black-300 font-bold"
                to=""
              >
                Select Candidate
              </Link>
            </li>
            {this.state.selectedCandidate === '' ? (
              <li className="mr-3">
                <Link
                  style={{ pointerEvents: 'none' }}
                  className="  inline-block bg-gray-300 text-xl font-bold rounded py-3 px-7  text-white"
                  to="/complete"
                >
                  Confirm
                </Link>
              </li>
            ) : (
              <li className="mr-3">
                <button
                  onClick={() => this.handleConfirm()}
                  className="  inline-block bg-green-600 text-xl font-bold rounded py-3 px-7  text-white"
                >
                  Confirm
                </button>
              </li>
            )}
          </ul>

          <div className="grid  grid-cols-5 m-10 gap-11">
            {this.state.candidates.map((candidate) => {
              if (this.state.selectedCandidate === candidate) {
                return (
                  <div
                    key={candidate.candidate}
                    onClick={() => this.selectCandidate(candidate)}
                    className="  relative border border-gray-200 rounded-xl w-24 h-auto"
                  >
                    <img className="p-2 object-contain w-max" src={ candidate.image }></img>
                    <img
                      className="absolute  rounded-xl bottom-1 right-0 h-auto  w-8/12 z-30 "
                      width={80}
                      src={swastik}
                    ></img>
                  </div>
                )
              } else {
                return (
                  <div
                    key={candidate.candidate}
                    
                    onClick={() => this.selectCandidate(candidate)}
                    className=" border border-gray-200 rounded-xl w-24 h-auto"
                  >
                    <img className="p-2 object-contain w-max " src={candidate.image}></img>
                  </div>
                )
              }
            })}
          </div>
        </div>
      )

          }
}
export default Candilist
