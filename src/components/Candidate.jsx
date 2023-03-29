import React, { useState } from 'react'
import Web3 from 'web3'
import VotingMachine from '../abis/VotingMachine.json'

const candidateIcons = [
  "/static/media/cat.20c866aede53e45aa6c4.jpg",
   "/static/media/dog.4058bcdf7d7807494297.jpg",
   "/static/media/lion.3d4707222e7182cd3a5c.jpg",
   "/static/media/parrot.1da698f5ed3579148152.jpg",
   "/static/media/wolf.8a80d9c728fe1003bbc0.jpg",
   "/static/media/owl.25ddeded0d255712fee2.jpg",
   "/static/media/panda.5bda9f906d1dbcf905b1.jpg",
  "/static/media/lemur.4351d43fa8e0812234ef.jpg",
   "/static/media/koala.451e751aa930ac41b649.jpg",
   "/static/media/fox.adbe94468ba7d778147e.jpg"
    ]






const Candidate = () => {
  const [InputAddress, setInputAddress] = useState('')
  const [voteCount, setVoteCount] = useState('')
  const [resultMessage, setresultMessage] = useState('')

  const handleCheckSubmit = async () => {
    let web3 = await new Web3(Web3.givenProvider || 'http://127.0.0.1:7545')
    window.ethereum.enable()
    console.log('web3 ')
    const accounts = await web3.eth.getAccounts()
    const deployer = accounts[0]
    const abi = VoteToken.abi
    const address = VoteToken.networks['5777'].address
    // console.log("abis : " , abi);
    const voteToken = new web3.eth.Contract(abi, address)
    // console.log(voteToken);[

    const voteCount = await voteToken.methods
      .VoteCount(InputAddress)
      .call({ from: deployer, gas: 999999 })
    setVoteCount(voteCount)
  }

  const handleAddCandidateSubmit = async () => {
    console.log(InputAddress)

    let web3 = await new Web3(Web3.givenProvider || 'http://192.168.75.120:7545')
    window.ethereum.enable()
    console.log('web3 ')
    const accounts = await web3.eth.getAccounts()
    const deployer = accounts[0]
    const abi = VotingMachine.abi
    const address = VotingMachine.networks['5777'].address
    // console.log("abis : " , abi);
    const votingMachine = new web3.eth.Contract(abi, address)
    // console.log(voteToken);[
      const result1 = await votingMachine.methods.TokenName().call()
      console.log("result1 : " , result1)
    try {

      
     const signedTransactionData  = await  web3.eth.accounts.signTransaction({
        to: address,
        value: 0,
        gas: 2000000,
        data : await votingMachine.methods.AddCandidate(InputAddress).encodeABI()
    }, '9cc055f936350545af35ad7b63aa7b9d01e1a1a7ac12a47f619d6f5eee040961')
  

  const result =  await web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction )

    //  const result =  await votingMachine.methods.AddCandidate(InputAddress).send({
    //           from: deployer,
    //           gas: 99999999
    //         })
            console.log("result : " , signedTransactionData )
      setresultMessage('Candidate added')
    } catch (error) {
      setresultMessage('Error occured')
      console.log(error)
    }
  }

  return (
    <div className="flex px-12 py-2 flex-col m-2 bg-white w-[95%] shadow-lg h-5/6">
      <h1 className="text-2xl text-blue-500 font-bold py-4 border-b-2  ">
        Candidate
      </h1>
      <div className="flex flex-col px-4 py-5 items-start text-md border-b-2  w-full">
        <div className="flex justify-start items-start ">
          <h1 className="text-md mr-2">Vote Count: </h1>
          <div className="border-2  rounded-lg">
            <input
              onChange={(e) => setInputAddress(e.target.value)}
              className="p-2"
              placeholder="Input Text"
            />
            <button
              onClick={handleCheckSubmit}
              className="bg-blue-500 text-white   rounded-md py-2 px-4"
            >
              Query
            </button>
          </div>
        </div>
        <h1 className="text-md mt-2 text-gray-500">Result: {voteCount}</h1>
      </div>
      <div className="flex flex-col px-4 py-5 items-start border-b-2  w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-md mr-2">Add Candidate: </h1>
          <div className="border-2  rounded-lg">
            <input  onChange={(e) => setInputAddress(e.target.value)} className="p-2" placeholder="Input Text" />
            <button    onClick={handleAddCandidateSubmit}
                        className="bg-blue-500 text-white   rounded-md py-2 px-4">
              Add
            </button>
          </div>
        </div>
        <h1 className="text-md mt-2 text-gray-500">{resultMessage}</h1>
      </div>
      {/* <div className="flex flex-col px-4 py-5 items-start border-b-2  w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-md mr-2">Change Symbol: </h1>
          <div className="border-2  rounded-lg">
            <input onChange={(e)=>setInputAddress(e.target.value)} className="p-2" placeholder="Addr1, Addr2" />
            <button onClick={handleAddCandidateSubmit} className="bg-blue-500 text-white   rounded-md py-2 px-4">
              Change
            </button>
          </div>
        </div>
        <h1 className="text-md mt-2 text-gray-500">Symbol Changed</h1>
      </div> */}
    </div>
  )
}

export default Candidate
