const {ethers} = require("hardhat");

const main = async  () => {
    const  [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const  Telephone = await ethers.getContractFactory("Telephone");
    const  telephone = await Telephone.deploy();
    await telephone.deployed();
    console.log("Token deployed to:", telephone.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });