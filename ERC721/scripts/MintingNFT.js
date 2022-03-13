require("dotenv").config();
const Web3 = require("web3");
//web3 is basically a collection of javascript libraries that help us to interact with the Ethereum blockchain
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.MNEMONIC;
const clientURL = `https://rpc-mumbai.maticvigil.com`;
const provider = new HDWalletProvider(mnemonic, clientURL);
const web3 = new Web3(provider);
//provider will be given to let our code know which blockchain it is interacting with. In our case we will be passing rpc server of ganache. This is the blockchain we are trying to connect with.
const data = require("../build/contracts/mintContract.json");
//importing ERC721.json, When we migrated our smart contract to the blockchain, it will create an addition build folder, created json files of all the smart contract we are using
//when we deploy our smart contract, it converted our smart contract to bytecode which is the code that blockchain understands
const abiArray = data.abi;
//This contract abi is the byproduct of deployment of our smart contract and it got saved on ERC721.json file
//it's an interface to interact with the bytecode
//Example, if we want to call a function in the smart contract with this javascript code we are writing, abi act as a
//intermediary between javascript code and bytecode
const contract_address = process.env.CONTRACT_ADDRESS;
//We have to pass the contract address we just deployed

//deploy function
const deploy = async () => {
  const accounts = await web3.eth.getAccounts(); //getting all accounts
  console.log("Attempting to deploy from account", accounts[0]); //deploying from accounts[0]

  const contract = await new web3.eth.Contract(abiArray, contract_address); //Create instances of contract that will call mintNFT function

  const tokenURI =
    "https://ipfs.io/ipfs/QmXYesdXszYy4UhivfCcq22yhDuqkFfTqSDfpBVNJYqV5Y"; //NFT metadata link
  await contract.methods.mintNFT(tokenURI).send({ from: accounts[0] }); //Call our mintNFT function

  console.log("Yay ! NFT minted succesfully.");
};

deploy();
