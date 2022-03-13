const mintContractNFT721 = artifacts.require("mintContract");

module.exports = function (deployer) {
  deployer.deploy(mintContractNFT721);
};
//module.exports is basically a instructions that tell Node.js, which bit of code to export so that other files in the
//project folder can access that code
//Here, deployed smart contract will be accessed by other files as well
