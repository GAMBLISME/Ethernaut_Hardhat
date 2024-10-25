const {ethers} = require('hardhat');

const main = async () => {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);

    const Coin_Flip = await ethers.getContractFactory('CoinFlip');
    const coin_flip = await Coin_Flip.deploy();
    await coin_flip.deployed();
    console.log('Coin Flip deployed to:', coin_flip.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })