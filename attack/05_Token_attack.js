// 这一关的目标是攻破下面这个基础 token 合约
// 你最开始有20个 token, 如果你通过某种方法可以增加你手中的 token 数量,你就可以通过这一关,当然越多越好
// 这可能有帮助:
//什么是 odometer?
const {ethers} = require('hardhat');
require('dotenv').config();

const Itoken_address = '0x8b113A01417F1669D397BB45FE5b92067c863e1f';
const Itoken_ABI = [
    'function transfer(address , uint ) external returns (bool)',
    'function balanceOf(address) external view returns (uint)',
];

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
const wallet1 = new ethers.Wallet(PRIVATE_KEY, provider);
const wallet2 = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);


const main = async  () => {
    const Itoken_Instance = await ethers.getContractAt(Itoken_ABI, Itoken_address, wallet2);
    const owner_balance = await Itoken_Instance.balanceOf(wallet1.address);
    console.log(`Owner balance: ${owner_balance.toString()}`);
    const attacker_balance = await Itoken_Instance.balanceOf(wallet2.address);
    console.log(`Attacker balance: ${attacker_balance.toString()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });