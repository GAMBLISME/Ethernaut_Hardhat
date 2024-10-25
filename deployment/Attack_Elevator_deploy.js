const {ethers} = require('hardhat');

const main = async () => {
    const users = await ethers.getSigners();
    console.log('Deploying contracts with the account:', users[0].address);

    const Attack_ElevatorFactory = await ethers.getContractFactory('Attack_Elevator');
    const Attack_Elevator = await Attack_ElevatorFactory.connect(users[0]).deploy('0x1FAed01BFAe34fE15cD451435C8C4E01515Aa4Bd');
    await Attack_Elevator.deployed();
    console.log('Attack_Elevator deployed to:', Attack_Elevator.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })