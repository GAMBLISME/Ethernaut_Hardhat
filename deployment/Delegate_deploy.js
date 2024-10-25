const {ethers} = require('hardhat');

const main = async () => {
    const users = await ethers.getSigners();
    console.log('Deploying contracts with the account:', users[0].address);

    const DelegateFactory = await ethers.getContractFactory('Delegate');
    const Delegate = await DelegateFactory.deploy(users[0].address);
    await Delegate.deployed();
    console.log('Delegate deployed to:', Delegate.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })