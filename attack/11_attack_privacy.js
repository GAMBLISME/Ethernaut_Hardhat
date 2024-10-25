const {ethers} = require('hardhat');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
const wallet1 = new ethers.Wallet(PRIVATE_KEY, provider);
const wallet2 = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);

const Privacy_Address = '0x71AFBF98c570e6758b066b4c8352071f6A32F6fd';
Privacy_Json = require('../artifacts/contracts/Privacy.sol/Privacy.json');
const elevatorAbi = Privacy_Json.abi;
const Privacy = new ethers.Contract(Privacy_Address, elevatorAbi, wallet1);

// const attackElevatorAddress = '0x8ded10D25410a9EC7daE30BAa70cdB8232Ade59d';
// const  attackElevatorJson = require('../artifacts/contracts/Elevator.sol/Attack_Elevator.json');
// const attackElevatorAbi = attackElevatorJson.abi;
// const attackElevator = new ethers.Contract(attackElevatorAddress, attackElevatorAbi, wallet1);


const main = async () => {
    let locked = await provider.getStorageAt(Privacy_Address, 0);
    console.log("is locked?: ", locked);
    // let ID = await provider.getStorageAt(Privacy_Address, 1);
    // console.log("ID: ", parseInt(ID, 16));
    const data2Hex  = await provider.getStorageAt(Privacy_Address, 5);
    console.log("data2: ", data2Hex);

    // 将十六进制字符串转换为字节数组，并确保长度为 16 字节
    // const data2Bytes = ethers.utils.arrayify(data2Hex).slice(0, 16);
    // console.log("data2Bytes: ", data2Bytes);
    // let s = ethers.utils.hexlify(data2Bytes);
    // console.log("s: ", s);
    let s1 = ethers.utils.hexDataSlice(data2Hex, 0,16);
    console.log("s1: ", s1);
    // 调用 Solidity 合约的 unlock 函数，并传入转换后的数据
    // const tx = await Privacy.unlock(s1);
    // await tx.wait(1);
    //
    // locked = await provider.getStorageAt(Privacy_Address, 0);
    // console.log("is locked?: ", locked);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
