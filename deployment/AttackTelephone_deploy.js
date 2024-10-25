const{ethers} = require("hardhat");

const main = async () => {
    const [deployer1,deployer2] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer2.address);

    const Attack_telephone = await ethers.getContractFactory("Hack");

    const attack_telephone = await Attack_telephone.deploy('0xC1eB9EEF58eC366D86D7cCB7a646Ca890f586557');

    await attack_telephone.deployed();

    console.log("Contract deployed to:", attack_telephone.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

