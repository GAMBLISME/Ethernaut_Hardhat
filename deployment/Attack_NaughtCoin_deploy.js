const {ethers} = require('hardhat');

const main = async () => {
    const users = await ethers.getSigners();
    console.log('Deploying contracts with the account:', users[0].address);

    const Attack_NaughtCoinFactory = await ethers.getContractFactory('Attack_NaughtCoin');
    const Attack_NaughtCoin = await Attack_NaughtCoinFactory.connect(users[0]).deploy('0x50ecFA79C2FbdB1482a0D912eed843d7eb29807B',users[0].address);
    await Attack_NaughtCoin.deployed();
    console.log('Attack_NaughtCoin deployed to:', Attack_NaughtCoin.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })