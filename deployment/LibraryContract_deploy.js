const {ethers} = require('hardhat');

const main = async () => {
    const users = await ethers.getSigners();
    console.log('Deploying contracts with the account:', users[0].address);

    const LibraryContractFactory = await ethers.getContractFactory('LibraryContract');
    const LibraryContract = await LibraryContractFactory.connect(users[0]).deploy();
    await LibraryContract.deployed();
    console.log('LibraryContract deployed to:', LibraryContract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })

