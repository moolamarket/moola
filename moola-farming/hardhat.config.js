require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require('hardhat-gas-reporter');

module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  gas: 'auto',
  gasReporter: {
    gasPrice: 1,
    enabled: false,
    showTimeSpent: true,
  },
};
