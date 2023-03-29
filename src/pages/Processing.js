import VotingMachine from '../abis/VotingMachine.json'
import Web3 from 'web3'


// const loadBlockchainData = async  () =>{
//   const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
//   await window.ethereum.enable();
//   const accounts = await web3.eth.getAccounts();
//   const deployer = accounts[0];
//   const abi = VotingMachine.abi ; 
//   const address = VotingMachine.networks['5777'].address ; 
//   console.log("token address : " , address);
// }

const Processing = async () => {

// await loadBlockchainData();

  return (
    <div className="flex h-screen">
      <div className="flex m-auto ">
        <div className="spinner-border animate-bounce inline-block w-screen/2 h-8  rounded-full">
          <h1 className=" text-4xl font-bold  ">Processing....</h1>
        </div>
      </div>
    </div>
  )
}

export default Processing();
