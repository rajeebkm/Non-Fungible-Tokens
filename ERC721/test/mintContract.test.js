const assert = require("assert");
//Import assert module which will provide us to test the expressions
const Web3 = require("web3");
//web3 is basically a collection of javascript libraries that help us to interact with the Ethreum blockchain
const web3 = new Web3("HTTP://127.0.0.1:8545");
//provider will be given to let our code know which blockchain it is interacting with. In our case we will be passing rpc server of ganache. This is the blockchain we are trying to connect with.
const data = require("../build/contracts/mintContract.json");
//importing ERC721.json, When we migrated our smart contract to the blockchain, it will create an addition build folder, created json files of all the smart contract we are using
//when we deploy our smart contract, it converted our smart contract to bytecode which is the code that blockchain understands
const abiArray = data.abi;
//This contract abi is the byproduct of deployment of our smart contract and it got saved on ERC721.json file
//it's an interface to interact with the bytecode
//Example, if we want to call a function in the smart contract with this javascript code we are writing, abi act as a
//intermediary between javascript code and bytecode
const contract_address = "0x62fFac6129454EBDf646b979C207471B9A08E4C9";
//We have to pass the contract address we just deployed

//Below codes will be using javascript testing framework called mocha
//we need to create an instance of the contract
//For creating instance, we will be using the module web3.eth
//web3.eth is a package which allows us to interact with an ethereum blockchain and the ethereum smart contract
//web3.eth.Contract creates an instance of the contract we have deployed so that we can use as if they were javascript objects

let accounts;
let art;

// beforeEach: before every test, first it will execute the lines of code inside beforeEach, then executes the rest
//of the lines
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  //To get all the accounts inside ganache and storing it in accounts array
  //We are checking whether owner of this smart contract is the first account of the ganache or not
  //Secondly, we are checking owner of the token id is same as very first first account of our ganache blockchain

  art = await new web3.eth.Contract(abiArray, contract_address);
});

//describe function: To create a test, we need to use the describe function to describe what this test is for
//and inside it we write it functions and within each it we write one of the test
//if we have multiple tests, we can simply nest them inside a describe function

describe("mintContract", () => {
  it("checks the owner", async () => {
    let owner = await art.methods.owner().call();
    assert.equal(owner, accounts[0]);
  });
  it("checks owner of tokenId 1", async () => {
    const tokenURI = "ABCD";
    await art.methods.mintNFT(tokenURI).send({ from: accounts[0] });
    let owner = await art.methods.ownerOf(1).call();
    assert.equal(owner, accounts[0]);
  });
  //   it("checks owner of tokenId 2", async () => {
  //     const tokenURI = "EFGH";
  //     await art.methods.mintNFT(tokenURI).send({ from: accounts[0] });
  //     let owner = await art.methods.ownerOf(2).call();
  //     assert.equal(owner, accounts[0]);
  //   });
  //   it("checks owner of tokenId 3", async () => {
  //     const tokenURI = "IJKL";
  //     await art.methods.mintNFT(tokenURI).send({ from: accounts[0] });
  //     let owner = await art.methods.ownerOf(3).call();
  //     assert.equal(owner, accounts[0]);
  //   });
  //   it("checks owner of tokenId 4", async () => {
  //     const tokenURI = "MNOP";
  //     await art.methods.mintNFT(tokenURI).send({ from: accounts[0] });
  //     let owner = await art.methods.ownerOf(4).call();
  //     assert.equal(owner, accounts[0]);
  //   });
  //   it("checks owner of tokenId 5", async () => {
  //     const tokenURI = "QRST";
  //     await art.methods.mintNFT(tokenURI).send({ from: accounts[0] });
  //     let owner = await art.methods.ownerOf(5).call();
  //     assert.equal(owner, accounts[0]);
  //   });
});
