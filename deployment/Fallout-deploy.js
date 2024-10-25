const {ethers} = require('hardhat');

const main = async function () {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);
    const Fallout = await ethers.getContractFactory('Fallout');
    const fallout = await Fallout.deploy();

    await fallout.deployed();

    console.log('Contract deployed to:', fallout.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
