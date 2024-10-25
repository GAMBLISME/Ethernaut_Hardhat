const {expect} = require('chai');
const {ethers} = require('hardhat');


describe('test for Ethernaut', function () {
    //可以全局变量，方便每个it进行调用测试
    let owner_balance;
    let instance;
    let attackInstance;
    let signer1;
    let signer2;
    let INITIAL_SUPPLY;
    beforeEach(async function () {
        //beforeEach每次it前全部重新执行
        //部署合约
        [signer1, signer2] = await ethers.getSigners();
        const Factory = await ethers.getContractFactory('NaughtCoin');
        instance = await Factory.connect(signer1).deploy(signer1.address);
        await instance.deployed();
        const instanceAddr = instance.address;

        INITIAL_SUPPLY = await instance.INITIAL_SUPPLY();

        //部署攻击合约
        const attack = await ethers.getContractFactory('Attack_NaughtCoin');
        attackInstance = await attack.connect(signer2).deploy(instanceAddr, signer1.address);
        await attackInstance.deployed();
    });
    it('player should be player[0]', async function () {
        const owner = await instance.player();
        expect(owner).to.equal(signer1.address);
    });

    it('balanceof(owner) should not be INITIAL_SUPPLY', async function () {
        owner_balance = await instance.balanceOf(signer1.address);
        expect(owner_balance).to.equal(INITIAL_SUPPLY);
    });
    it('ATTACK=====>balanceof(owner) should be zero', async function () {
        const contract = await ethers.getContractAt("NaughtCoin", instance.address, signer1);
        const attack_contract = await ethers.getContractAt("Attack_NaughtCoin", attackInstance.address, signer2);
        INITIAL_SUPPLY = await contract.INITIAL_SUPPLY();
        await contract.approve(signer2.address, INITIAL_SUPPLY);
        let allowance = await contract.allowance(signer1.address, signer2.address);


        // expect(allowance).to.equal(INITIAL_SUPPLY);
         const tx = await attack_contract.attack(allowance, signer2.address);
         await tx.wait(1);

        owner_balance = await contract.balanceOf(signer1.address);
        expect(owner_balance).to.equal(0);
    })
})


// const fs = require('fs');
//
// // 在 JavaScript 测试脚本中，设置输出文件路径
// const logFilePath = './logs/output.log';
//
// // 在 Solidity 合约或 JavaScript 测试脚本中，定义一个自定义的日志函数
// function logToConsoleAndFile(message) {
//     console.log(message); // 输出到控制台
//     fs.appendFileSync(logFilePath, message + '\n'); // 输出到日志文件
// }
//
// // 调用自定义的日志函数来输出内容
// logToConsoleAndFile('This is a log message.');
