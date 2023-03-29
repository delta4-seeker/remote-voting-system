import React, { useEffect, useRef, useState } from "react";
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
import Web3 from 'web3'
import VotingMachine from '../abis/VotingMachine.json'
let candidateList = []; 

const candidatesImage = [
  cat,dog,lion,parrot,wolf,owl,panda,lemur,koala,fox
];
const Voter = () => {
  const [voter, setVoterAdd] = useState("")
  const [checkVote, setCheckVote] = useState("")
  const [balance, setBalance] = useState("")
  const [resultMessage, setresultMessage] = useState("")
  const [selectCandidate, setselectCandidate] = useState("")
 


  let  LoadBlockchainData = async() => {
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545')
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const deployer = accounts[0];
    const abi = VotingMachine.abi ; 
    const address = VotingMachine.networks['5777'].address ; 
    console.log("token address : " , address);
    const votingMachine =  new web3.eth.Contract(abi , address)
    candidateList = [];
    let result = await votingMachine.getPastEvents('CandidateList' , {    fromBlock: 0,
      toBlock: 'latest',} );
      console.log(" ");

      for(let i = 0 ; i  < result.length ; i++){
let items = result[i]
         candidateList.push( {
          symbol :  items.returnValues.symbol,
          id :  items.returnValues.id,
          count : await  votingMachine.methods.CandidateVoteCount(items.returnValues.id).call({from : deployer , gas : 999999})

        })

      }
      // await result.map( async items => {
      //   await candidateList.push( {
      //     symbol :  items.returnValues.symbol,
      //     count : await  votingMachine.methods.CandidateVoteCount(items.returnValues.id).call({from : deployer , gas : 999999})

      //   })
      // });



    console.log("result : " , candidateList);
    candidateList.forEach( candidate => {
      console.log(candidate.symbol)
    })


  
  }

      useEffect(() => {
      
         LoadBlockchainData()
      }, [])
  
    
  return (
    <div className="flex px-12 py-2 flex-col m-2 bg-white w-[95%] shadow-lg h-5/6">
      <h1 className="text-2xl text-blue-500 font-bold py-4 border-b-2  ">
      Result
      </h1>
      <div className="grid  grid-cols-5 m-10 gap-11">
            {candidateList.map((candidate) => {
                return (
                  <div
                    key={candidate.id}
                    className="  relative border  rounded-xl w-24 h-auto"
                  >
                    <img className="p-2 object-contain w-max" src={ candidate.symbol }></img>
                    <h1
                      className="absolute text-sm  rounded-xl font-bold bottom-0 left-0 h-auto  w-8/12 z-30 "
                      width={80}
                    >{candidate.count}</h1>
                  </div>
                )
            
            })}
          </div>
  
    </div>
  );
};

export default Voter;
