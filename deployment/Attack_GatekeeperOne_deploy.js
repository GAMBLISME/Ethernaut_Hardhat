const {ethers} = require('hardhat');

const main = async () => {
    const users = await ethers.getSigners();
    console.log('Deploying contracts with the account:', users[0].address);

    const Attack_GatekeeperOneFactory = await ethers.getContractFactory('Attack_GatekeeperOne');
    const Attack_GatekeeperOne = await Attack_GatekeeperOneFactory.connect(users[0]).deploy();
    await Attack_GatekeeperOne.deployed();
    console.log('Attack_GatekeeperOne deployed to:', Attack_GatekeeperOne.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })