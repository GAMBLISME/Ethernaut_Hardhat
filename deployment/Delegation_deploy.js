const {ethers} = require('hardhat');

const main = async () => {
    const users = await ethers.getSigners();
    console.log('Deploying contracts with the account:', users[0].address);

    const DelegationFactory = await ethers.getContractFactory('Delegation');
    const Delegation = await DelegationFactory.deploy('0x13a01B2D9a29A89E846ABd54E98C78b1294F7f3A');
    await Delegation.deployed();
    console.log('Delegation deployed to:', Delegation.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })