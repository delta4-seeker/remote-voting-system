

module.exports = async function (callback) {

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
  const accounts = await web3.eth.getAccounts()
  const deployer = accounts[0]
  const candidates = accounts.slice(1, 11)
  // console.log('candidate are : ', candidates)
  const voters = accounts.slice(11, 20)
  // console.log('voters are : ', voters)
  // candidateIcons.sort(Math.random())
  const votingMachine = await VotingMachine.deployed()
  console.log('name : ', await VotingMachine.TokenName())

  for(let i = 0 ; i < candidateIcons.length ; i++ ){
    await votingMachine.AddCandidate(candidateIcons[i], {
      from: deployer,
      gas: 999999,
    })
    console.log('Candidate added : ', candidateIcons[i])  
}


}