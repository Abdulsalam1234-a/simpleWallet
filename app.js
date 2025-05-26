let provider;
let signer;
let walletContract;

// Replace with your contract address and ABI
const contractAddress = "0xEf9f1ACE83dfbB8f559Da621f4aEA72C6EB10eBf";
const contractABI = [
  // Add only the ABI of the methods used
  "function deposit() public payable",
  "function getContractBalance() public view returns (uint)",
  "function getMyBalance() public view returns (uint)",
  "function withdraw(uint _amount) public",
  "function owner() public view returns (address)"
];

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    walletContract = new ethers.Contract(contractAddress, contractABI, signer);
    const address = await signer.getAddress();
    document.getElementById("walletAddress").innerText = `Wallet: ${address}`;
  } else {
    alert("Install MetaMask first!");
  }
}

async function deposit() {
  const ethAmount = document.getElementById("depositAmount").value;
  const tx = await walletContract.deposit({ value: ethers.utils.parseEther(ethAmount) });
  await tx.wait();
  alert("Deposit successful!");
}

async function getContractBalance() {
  const balance = await walletContract.getContractBalance();
  document.getElementById("contractBalance").innerText = `${ethers.utils.formatEther(balance)} ETH`;
}

async function getMyBalance() {
  const balance = await walletContract.getMyBalance();
  document.getElementById("myBalance").innerText = `${ethers.utils.formatEther(balance)} ETH`;
}

async function withdraw() {
  const ethAmount = document.getElementById("withdrawAmount").value;
  const tx = await walletContract.withdraw(ethers.utils.parseEther(ethAmount));
  await tx.wait();
  alert("Withdrawal successful!");
}
