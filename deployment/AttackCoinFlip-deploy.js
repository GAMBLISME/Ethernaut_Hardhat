const {ethers} = require('hardhat');


const main = async () => {
    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying contracts with the account:",
         deployer.address
    );

    const AttackCoinFlip = await ethers.getContractFactory("attack_CoinFlip");
    //目标地址为0xa0075Dc2693D3a9E5Aa71Fc55266Aed6d4f0b010
    const attackCoinFlip = await AttackCoinFlip.deploy('0xC1493cEFf2DC084bB7dbe0a4c265877011Da4454');
    console.log("[+] target address: ",await attackCoinFlip.target());

    await attackCoinFlip.deployed();
    console.log("attackCoinFlip address:", attackCoinFlip.address);
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
})