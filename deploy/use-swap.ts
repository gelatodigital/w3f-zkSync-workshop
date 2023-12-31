import { Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

// load env file
import dotenv from "dotenv";
dotenv.config();

// load contract artifact. Make sure to compile first!
import * as ContractArtifact from "../artifacts-zk/contracts/MockSwap.sol/MockSwap.json";
import { MockSwap } from "../typechain-types/MockSwap";
import { parseEther } from "ethers/lib/utils";

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

if (!PRIVATE_KEY)
  throw "⛔️ Private key not detected! Add it to the .env file!";

// Address of the contract on zksync testnet
const CONTRACT_ADDRESS = "0x5e78ba86fd2E56d94c13334cD17FBD9Bb16838e0";

if (!CONTRACT_ADDRESS) throw "⛔️ Contract address not provided";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`);

  // Initialize the provider.
  // @ts-ignore
  const provider = new Provider(hre.userConfig.networks?.zkSync?.url);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  // Initialize contract instance
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ContractArtifact.abi,
    signer
  ) as MockSwap; 

  // Read message from contract
  const newMessage =  parseEther("1")
  const tx = await contract.deposit("0xB65540bBA534E88EB4a5062D0E6519C07063b259",newMessage)
  await tx.wait();

  // send transaction to update the message
  const price=  parseEther("1.002")
  const tx2 = await contract.swap("0xB65540bBA534E88EB4a5062D0E6519C07063b259",price,true)
  await tx2.wait();
  

  

  // Read message after transaction
 
}
