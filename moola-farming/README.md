# Moola

MoolaStakingRewards

## Usage

Set deployer/owner private key in the `env` file.

1. Deploy MoolaStakingRewards:

    npm run hardhat -- --network celo|alfajores deploy-msr --owner 0xOwnerAddress --rewards-distribution 0xOwnerAddress --rewards-token 0xRewardToken --external-staking-rewards 0xStakingRewards --staking-token 0xStakingToken --external-rewards-tokens 0xExternalRewardToken1[,0xExternalRewardToken2,...]

2. Topup the deployed contract with reward tokens REWARD_AMOUNT.
3. Start rewarding:

    npm run hardhat -- --network celo|alfajores start-rewarding-period --moola-staking-rewards 0xDeployedContract --amount REWARD_AMOUNT

Repeat steps 2 and 3 in the end of every rewarding period.
