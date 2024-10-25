const {ethers} = require('hardhat');

const main = async () => {
    const users = await ethers.getSigners();
    const lockedAmount = await ethers.utils.parseEther('0.0000001');
    console.log('Deploying contracts with the account:', users[1].address);
    const Token = await ethers.deployContract('Token',[20],{signer:users[1],value:lockedAmount});

    // const TokenFactory = await ethers.getContractFactory('Token');
    // const Token = await TokenFactory.connect(users[0]).deploy();
    await Token.deployed();
    console.log('Token deployed to:', Token.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })