// SPDX-License-Identifier: MIT
pragma solidity^0.8.17 ; 
contract VotingMachine { 
   mapping(uint256 => string) Voter ; // for use in registration
   // voter id => fngerprint 
   mapping(uint256 =>  bool) VoterDidVoted ; // initialised in  registration , updated in voting process
   mapping(uint256 =>  bool) VoterDidRegistered ; // initialised in  registration , updated in voting process
   // voter id => voting right ; 
   mapping(uint256 => uint256) public CandidateVoteCount ; // used in voting process
   // candidate id => vote count ;

   uint256 public  VoterCount = 999999999999999  ; // updated in registration 
   uint256 public  CandidateCount  ; // updated in registration 
   uint256 public  TotalVoteCount  ;  // updated in voting process
   string  public TokenName = "Vote" ; 

   event CandidateList(uint256 id , string symbol ); // used in candidate registration
   event FingerPrint(string data ); // used in candidate registration
   event VoterRegister(uint256 voterId ); // used in candidate registration

   address public Owner ; 

   constructor(){
        Owner = msg.sender ; 
     }

   function AddCandidate(string memory symbol) public{
         require(msg.sender == Owner , "Only ElectionCommision can call this function.");
         CandidateCount++ ; 
         CandidateVoteCount[CandidateCount] = 0 ;
         emit CandidateList(CandidateCount,  symbol );
     }
    
  
     function AddVoter(string memory fingerprint) public {
        require( msg.sender == Owner , "ElectionCommision can only call this function");
        VoterCount = VoterCount + 1 ; 
        uint256 voterId = VoterCount ; 
        Voter[voterId] = fingerprint ; 
        VoterDidRegistered[voterId] = true ; 
           emit VoterRegister(voterId); // used in candidate registration

 
     }

     function Reset() public  {
      require( msg.sender == Owner , "ElectionCommision can only call this function");
      for(uint256 i = 999999999999999 ; i < VoterCount + 1 ; i++){
         VoterDidVoted[i] = false ; 
      }
      for(uint256 i = 0 ; i < CandidateCount ; i++){
         CandidateVoteCount[i] = 0 ; 
      }
      TotalVoteCount = 0 ;
     }

   function VerifyVoter(uint256 voterID) public  { 
      require( msg.sender == Owner , "ElectionCommision can only call this function");
      require(VoterDidRegistered[voterID] , "Sorry, You are not registered");
      require(!VoterDidVoted[voterID] , "Sorry, You cant Vote");
      emit FingerPrint( Voter[voterID]);

   }
     function Vote(uint256 _candidate , uint256 _voter) public { 
            require (msg.sender == Owner);
            require(!VoterDidVoted[_voter] , "Sorry, You cant Vote");
            CandidateVoteCount[_candidate]++ ; 
            VoterDidVoted[_voter] = true ; 
            TotalVoteCount = TotalVoteCount + 1 ; 
     }
}