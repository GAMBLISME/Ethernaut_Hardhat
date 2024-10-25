const {ethers} = require('hardhat');

const main = async () => {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);

    const contract = await ethers.getContractFactory('Fallback');
    const fallback = await contract.deploy();
    await fallback.deployed();
    console.log('Market deployed to:', fallback.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
