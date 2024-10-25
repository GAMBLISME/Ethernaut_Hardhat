const {ethers} = require('hardhat');

const main = async () => {
    const users = await ethers.getSigners();
    console.log('Deploying contracts with the account:', users[0].address);

    const Attack_GatekeeperTwoFactory = await ethers.getContractFactory('Attack_GatekeeperTwo');
    const Attack_GatekeeperTwo = await Attack_GatekeeperTwoFactory.connect(users[0]).deploy('0x97ea7d3B0E0f9A824e4cD71c0e020b575ECf939D');
    await Attack_GatekeeperTwo.deployed();
    console.log('Attack_GatekeeperTwo deployed to:', Attack_GatekeeperTwo.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })