const VotingMachine = artifacts.require('./VotingMachine')
require('chai').use(require('chai-as-promised')).should()

contract('VotingMachine', ([deployer, candidate, voter1, voter2, voter3]) => {
  const name = 'Vote'
  let votingMachine

  beforeEach(async () => {
    votingMachine = await VotingMachine.new()
  })

  describe('testing deployment', () => {
    describe('success', () => {
      it('track the name', async () => {
        const result = await votingMachine.TokenName()
        result.should.equal(name)
      })
      it('Should compare deployer with Owner address', async () => {
        const result = await votingMachine.Owner()
        result.toString().should.equal(deployer.toString())
      })
    })

    describe('failure', () => {})
  })

  describe('Add voters', () => {
    describe('success', async () => {
      let result
      let OldVoterCount
      let NewVoterCount
      beforeEach(async () => {
          OldVoterCount = await votingMachine.VoterCount()
        result = await votingMachine.AddVoter("hello" ,  { from: deployer })
      })

      it('VoterCount increment after adding voter ', async () => {
        NewVoterCount = await votingMachine.VoterCount()
        OldVoterCount.toString().should.equal((NewVoterCount - 1).toString())
      })
  
  })
})


    // describe('Add candidate', () => {
    //   describe('success', async () => {
    //     let result
    //     beforeEach(async () => {
    //       result = await votingMachine.addCandidate(candidate, "image123" , "address123" ,  { from: deployer })
    //       result = await votingMachine.addCandidate(voter2, "image456" , "address456" ,  { from: deployer })
    //       // console.log("add candiddate result : " , result );
    //     })
    //     it('emits and add candidate event', async () => {
    //       console.log(" ");
    //       console.log("evnts : " , result.logs[0].args.image)
    //       result.logs[0].event.toString().should.eq('CandidateList');
    //       result = await votingMachine.getPastEvents('CandidateList' , {    fromBlock: 0,
    //         toBlock: 'latest',});
    //         console.log(" ");
    //         result.map(items => {
    //           console.log("candidate : " , items.args.candidate)
    //           console.log("image : " , items.args.image)
    //           console.log("resident : " , items.args.residence)

    //           console.log(" ");
    //         })
    //     })
    //     it('Candidate index 0 should be candidate address', async () => {
    //       const result = await votingMachine.Candidate(0);
    //       result.toString().should.equal(candidate)
    //     })

    //     it('VoteCount of candidate should be zero', async () => {
    //       result = await votingMachine.VoteCount(candidate , {from : deployer}) ;
    //       // console.log( "vOTE Count of candidate is |: "  , result.toString() );
    //       result.toString().should.equal("0")
    //     })

    //   })
    //   describe('failure', () => {})
    // })
  })