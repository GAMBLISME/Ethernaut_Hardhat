/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require('dotenv').config();
require('hardhat-gas-reporter');
require('hardhat-tracer')

ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;
PRIVATE_KEY = process.env.PRIVATE_KEY;
SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;
ONLYPWNER_RPC = process.env.ONLYPWNER_RPC;
ONLYPWNER_PRIVATE_KEY = process.env.ONLYPWNER_PRIVATE_KEY;

module.exports = {
    solidity: {
        compilers: [

            {
                version: "0.8.8"
            },
            {
                version: "0.6.0"
            },
            {
                version: "0.8.19"
            },
            {
                version: "0.6.12"
            }

        ]

    },
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: ALCHEMY_SEPOLIA_URL,
            accounts: [PRIVATE_KEY, SECOND_PRIVATE_KEY],
        },
        only: {
            url: ONLYPWNER_RPC,
            accounts: [ONLYPWNER_PRIVATE_KEY]
        }
        // hardhat:{
        //   forking:{
        //     url:ALCHEMY_SEPOLIA_URL,
        //     blockNumber:12312321415
        //   }
        // }


    },


    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY
    }


};
