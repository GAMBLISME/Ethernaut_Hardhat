const {ethers} = require('hardhat');

const ONLYPWNER_RPC = process.env.ONLYPWNER_RPC;
const ONLYPWNER_PRIVATE_KEY = process.env.ONLYPWNER_PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(ONLYPWNER_RPC);
const wallet = new ethers.Wallet(ONLYPWNER_PRIVATE_KEY, provider);

const instanceAddress = "0x78aC353a65d0d0AF48367c0A16eEE0fbBC00aC88";
const instanceJson = require("../artifacts/contracts/Vault.sol/Vault.json");
const instanceAbi = instanceJson.abi;
const instance = ethers.Contract(instanceAddress, instanceAbi, wallet);


const main = async () => {

    let slot0 = await provider.getStorageAt(instanceAddress, 0);
    console.log("Slot 0: ", slot0);
    // let totalDeposited = await instance.totalDeposited();
    // console.log("Total Deposited: ", totalDeposited.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });