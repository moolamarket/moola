require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require('hardhat-gas-reporter');

const {PRIVATE_KEY} = process.env;

const assert = (condition, message) => {
  if (condition) return;
  throw new Error(message);
}

task('deploy', 'Deploy MoolaStakingRewards')
  .addParam('owner', 'Owner of the deployed contract')
  .addParam('rewardsDistribution', 'Address that will initiate every rewards period, could be the same as owner')
  .addParam('rewardsToken', 'Token to be rewarded')
  .addParam('externalStakingRewards', 'StakingRewards contract for restaking')
  .addParam('stakingToken', 'Token used for staking, will be validated to be the same as in the ExternalStakingRewards')
  .setAction(async ({owner, rewardsDistribution, rewardsToken, externalStakingRewards, stakingToken}) => {
    assert(ethers.utils.isAddress(owner), `Owner address '${owner}' is invalid.`);
    assert(ethers.utils.isAddress(rewardsDistribution),
      `RewardsDistribution address '${rewardsDistribution}' is invalid.`);
    assert(ethers.utils.isAddress(rewardsToken),
      `Rewards token address '${rewardsToken}' is invalid.`);
    assert(ethers.utils.isAddress(externalStakingRewards),
      `External staking rewards address '${externalStakingRewards}' is invalid.`);
    assert(ethers.utils.isAddress(stakingToken),
      `Staking token address '${stakingToken}' is invalid.`);
    const [deployer] = await ethers.getSigners();

    const externalSR = await ethers.getContractAt('IStakingRewards', externalStakingRewards);
    const actualStakingToken = await externalSR.stakingToken();
    assert(actualStakingToken.toLowerCase() == stakingToken.toLowerCase(),
      `ExternalStakingRewards staking token ${actualStakingToken} doesn't match the expected one ${stakingToken}`);

    console.log(
      `Deploying MoolaStakingRewards with the account: ${deployer.address}`
    );

    console.log(`Deployer balance: ${ethers.utils.formatEther(await deployer.getBalance())}`);

    const MoolaStakingRewards = await ethers.getContractFactory('MoolaStakingRewards');
    const moolaStakingRewards = await MoolaStakingRewards.deploy(
      owner, rewardsDistribution, rewardsToken, externalStakingRewards);
    console.log('Waiting for deploy.');
    await moolaStakingRewards.deployed();

    console.log('Contract address:', moolaStakingRewards.address);

    console.log(`Deployer balance: ${ethers.utils.formatEther(await deployer.getBalance())}`);
  });

task('start-rewarding-period', 'Deploy MoolaStakingRewards')
  .addParam('moolaStakingRewards', 'Deployed contract')
  .addParam('amount', 'Human readable amount to be rewarded, should be sent to the contract upfront')
  .setAction(async ({moolaStakingRewards, amount}) => {
    assert(ethers.utils.isAddress(moolaStakingRewards), `Moola StakingRewards address '${moolaStakingRewards}' is invalid.`);
    const amountWei = ethers.utils.parseEther(amount);
    const [deployer] = await ethers.getSigners();

    const moolaSR = await ethers.getContractAt('MoolaStakingRewards', moolaStakingRewards);

    console.log(
      `Start rewarding with the account: ${deployer.address}`
    );

    const tx = await moolaSR.notifyRewardAmount(amountWei);
    console.log(tx.hash);
    console.log('Waiting for confirmation.');
    await tx.wait();

    console.log('Done.');
  });

module.exports = {
  networks: {
    celo: {
      url: 'https://forno.celo.org',
      chainId: 42220,
      accounts: [PRIVATE_KEY],
    },
    alfajores: {
      url: 'https://alfajores-forno.celo-testnet.org',
      chainId: 44787,
      accounts: [PRIVATE_KEY],
    },
  },
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
