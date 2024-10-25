const {ethers} = require('hardhat');

const main = async () => {
    const users = await ethers.getSigners();
    console.log('Deploying contracts with the account:', users[1].address);

    const attack_TokenFactory = await ethers.getContractFactory('attack_Token');
    const attack_Token = await attack_TokenFactory.connect(users[1]).deploy('0x8b113A01417F1669D397BB45FE5b92067c863e1f');
    await attack_Token.deployed();
    console.log('attack_Token deployed to:', attack_Token.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })