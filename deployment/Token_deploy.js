const {ethers} = require('hardhat');

const main = async  () => {
    //部署合约
    const [deployer] = await ethers.getSigners();
    console.log("deployer address:", deployer.address);
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(20);
    await token.deployed();
    console.log("token address:", token.address);
    console.log("deployer balance:", (await token.balanceOf(deployer.address)).toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });