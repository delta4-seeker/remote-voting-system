import React from 'react'
import  io  from 'socket.io-client'
import VotingMachine from '../abis/VotingMachine.json'
import Web3 from 'web3'
import { Link,Redirect, useNavigate } from 'react-router-dom'

class Complete extends React.Component {

    async componentDidMount() {
      console.log("rready")

        this.socket = await io('http://localhost:3002')
        this.socket.open();
  
        await this.socket.on('data', async (data1) => {
          console.log(data1);
          let data = data1
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

  
      })

  }



  componentWillUnmount(){
  }
  render() {
      return (
        <div className="row-2 ">
          <div>
        
          </div>

          <div className=" flex justify-center items-center h-screen mx-auto ">
              <div className="spinner-border animate-bounce inline-block  w-11/12 px-5 text-center   font-semibold rounded-full">
                <h1 className=" text-2xl   ">
                  Voting Process{' '}
                  <span className="text-green-500   font-bold">Successful</span>. Remove your card.

             
                </h1>
              </div>
          </div>

         
        </div>
      )
    }
  }


export default Complete
