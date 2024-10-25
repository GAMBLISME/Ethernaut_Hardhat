const {ethers} = require('hardhat');

const main = async () => {
    const users = await ethers.getSigners();
    console.log('Deploying contracts with the account:', users[0].address);

    const ForceFactory = await ethers.getContractFactory('Force');
    const Force = await ForceFactory.connect(users[0]).deploy();
    await Force.deployed();
    console.log('Force deployed to:', Force.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })