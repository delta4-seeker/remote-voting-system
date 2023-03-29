import React, { useEffect, useRef, useState } from "react";

const Dashboard = () => {

  const [voterCount, setVoterCount] = useState("")
  const [CandidateCount, setCandidateCount] = useState("")
  const [voteCount, setVoteCount] = useState("")
  const [remainingVote, setRemainingVote] = useState("")

  return (
    <div className="flex px-12 py-2 flex-col m-2 shadow-lg bg-white w-[95%] h-5/6  ">
      <h1 className="text-2xl text-blue-500 font-bold py-4 border-b-2 ">
        Dashboard
      </h1>
     <div className="grid grid-row2">
      <div className="row-start-1 row-end-4">
      <div className="text-sm py-5 font-semibold">
      <h1 className="">Total Voters: {voterCount}</h1>
      <h1 className="">Total Vote Received: {voteCount}</h1>
        <h1 className="">Remaining Votes: {remainingVote}</h1>
        <h1 className="">
          Time Started: {"date"}, {"timeStarted"}
        </h1>
        <h1 className="">Time Remaining: {"timer"}</h1>
        <div className="row-start-2 w-56 m-10 row-end-4">

      </div>
      </div>
      </div>
      <div className="row-start-1 row-end-4">
      <div className="text-sm py-5 font-semibold">
      <h1 className="">Total Candidates: {CandidateCount}</h1>
      <h1 className="">Total election poll: 32</h1>
        <h1 className="">Total EVM nodes: 160</h1>
        <h1 className="">
          Time Started: {"date"}, {"timeStarted"}
        </h1>
        <h1 className="">Time Remaining: {"timer"}</h1>
        <div className="row-start-2  m-10 w-56 row-end-4">

      <button >Start</button>
      <button>Reset</button>
      </div>
      </div>
      </div>

     </div>

  
    </div>
  );
};

export default Dashboard;
