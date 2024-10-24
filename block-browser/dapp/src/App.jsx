import { ethers } from "ethers";
import './App.css'
import BalanceReader from "./BalanceReader.jsx";
import BlockExplorer from "./BlockExplorer";
import VendingMachine from "./VendingMachine";
import BTC2ETH from "./BTC2ETH";

const providerUrl = 'https://ethereum-sepolia-rpc.publicnode.com';
const provider = new ethers.JsonRpcProvider(providerUrl);
const network = await provider.getNetwork();
function App() {
  console.log(network);
  return (
    <div>
      <BalanceReader provider={provider} />
      <BlockExplorer provider={provider} />
      <VendingMachine provider={provider} />
      <BTC2ETH provider={provider} />
    </div>
  )
}
export default App