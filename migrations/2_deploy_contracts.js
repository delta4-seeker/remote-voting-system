const VotingMachine = artifacts.require("VotingMachine");

module.exports = function(deployer) {
   deployer.deploy( VotingMachine);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
};
