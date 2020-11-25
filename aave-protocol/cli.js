const { newKit } = require('@celo/contractkit');
const LendingPoolAddressesProvider = require('./abi/LendingPoolAddressesProvider.json');
const LendingPool = require('./abi/LendingPool.json');
const LendingPoolCore = require('./abi/LendingPoolCore.json');
const AToken = require('./abi/AToken.json');
const BigNumber = require('bignumber.js');
const Promise = require('bluebird');

const INTEREST_RATE = {
  NONE: 0,
  STABLE: 1,
  VARIABLE: 2,
  1: 'STABLE',
  2: 'VARIABLE',
  0: 'NONE',
};

const ether = '1000000000000000000';
const ray = '1000000000000000000000000000';
const maxUint256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

function BN(num) {
  return new BigNumber(num);
}

function print(num) {
  return BN(num).dividedBy(ether).toFixed();
}

function printRay(num) {
  return BN(num).dividedBy(ray).toFixed();
}

function printActions() {
  console.info('Available actions:');
  console.info('balanceOf celo|cusd address');
  console.info('getUserReserveData celo|cusd address');
  console.info('getReserveData celo|cusd');
  console.info('getUserAccountData celo|cusd address');
  console.info('deposit celo|cusd address amount [privateKey]');
  console.info('borrow celo|cusd address amount stable|variable [privateKey]');
  console.info('repay celo|cusd address amount|all [privateKey]');
  console.info('redeem celo|cusd address amount|all [privateKey]');
}

const retry = async (fun, tries = 5) => {
  try {
    return await fun();
  } catch(err) {
    if (tries == 0) throw err;
    await Promise.delay(1000);
    return retry(fun, tries - 1);
  }
};

async function execute(network, action, ...params) {
  if (network === undefined) {
    console.info('Usage: test|main|URL action params');
    printActions();
    return;
  }
  let kit;
  let addressProvider
  let privateKeyRequired = true;
  switch (network) {
    case 'test':
      kit = newKit('https://alfajores-forno.celo-testnet.org');
      addressProvider = new kit.web3.eth.Contract(LendingPoolAddressesProvider, '0x6EAE47ccEFF3c3Ac94971704ccd25C7820121483');
      break;
    case 'main':
      kit = newKit('https://forno.celo.org');
      addressProvider = new kit.web3.eth.Contract(LendingPoolAddressesProvider, '0x7AAaD5a5fa74Aec83b74C2a098FBC86E17Ce4aEA');
      break;
    default:
      try {
        kit = newKit(network);
      } catch(err) {
        console.info(`Unknown network: ${network}`);
        console.info(`Available networks: test, main, or custom node URL.`);
        return;
      }
      addressProvider = new kit.web3.eth.Contract(LendingPoolAddressesProvider, '0x7AAaD5a5fa74Aec83b74C2a098FBC86E17Ce4aEA');
      privateKeyRequired = false;
  }
  const web3 = kit.web3;
  const eth = web3.eth;

  const CELO = await kit.contracts.getGoldToken();
  const cUSD = await kit.contracts.getStableToken();
  const lendingPool = new eth.Contract(LendingPool, await addressProvider.methods.getLendingPool().call());
  const lendingPoolCore = new eth.Contract(LendingPoolCore, await addressProvider.methods.getLendingPoolCore().call());
  const tokens = {
    celo: CELO,
    cusd: cUSD,
  };
  const reserves = {
    celo: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    cusd: cUSD.address,
  };
  if (action === 'balanceof') {
    const token = tokens[params[0]];
    const user = params[1];
    console.info((await token.balanceOf(user)).div(ether).toFixed());
    return;
  }
  if (action == 'getuserreservedata') {
    const reserve = reserves[params[0]];
    const user = params[1];
    const data = await lendingPool.methods.getUserReserveData(reserve, user).call();
    const parsedData = {
      Deposited: print(data.currentATokenBalance),
      Borrowed: print(data.principalBorrowBalance),
      Debt: print(data.currentBorrowBalance),
      RateMode: INTEREST_RATE[data.borrowRateMode],
      BorrowRate: printRay(data.borrowRate),
      LiquidityRate: printRay(data.liquidityRate),
      OriginationFee: print(data.originationFee),
      BorrowIndex: print(data.variableBorrowIndex),
      LastUpdate: (new Date(BN(data.lastUpdateTimestamp).multipliedBy(1000).toNumber())).toLocaleString(),
      IsCollateral: data.usageAsCollateralEnabled,
    };
    console.table(parsedData);
    return;
  }
  if (action == 'getuseraccountdata') {
    const user = params[0];
    const data = await lendingPool.methods.getUserAccountData(user).call();
    const parsedData = {
      TotalLiquidity: print(data.totalLiquidityETH),
      TotalCollateral: print(data.totalCollateralETH),
      TotalBorrow: print(data.totalBorrowsETH),
      TotalFees: print(data.totalFeesETH),
      AvailableBorrow: print(data.availableBorrowsETH),
      LiquidationThreshold: `${data.currentLiquidationThreshold}%`,
      LoanToValue: `${data.ltv}%`,
      healthFactor: data.healthFactor.length > 30 ? 'SAFE' : print(data.healthFactor),
    };
    console.table(parsedData);
    return;
  }
  if (action == 'getreservedata') {
    const reserve = reserves[params[0]];
    const data = await lendingPool.methods.getReserveData(reserve).call();
    const parsedData = {
      TotalLiquidity: print(data.totalLiquidity),
      AvailableLiquidity: print(data.availableLiquidity),
      TotalBorrowsStable: print(data.totalBorrowsStable),
      TotalBorrowsVariable: print(data.totalBorrowsVariable),
      LiquidityRate: print(data.liquidityRate),
      VariableRate: printRay(data.variableBorrowRate),
      StableRate: printRay(data.stableBorrowRate),
      AverageStableRate: printRay(data.averageStableBorrowRate),
      UtilizationRate: printRay(data.utilizationRate),
      LiquidityIndex: printRay(data.liquidityIndex),
      VariableBorrowIndex: printRay(data.variableBorrowIndex),
      MToken: data.aTokenAddress,
      LastUpdate: (new Date(BN(data.lastUpdateTimestamp).multipliedBy(1000).toNumber())).toLocaleString(),
    };
    console.table(parsedData);
    return;
  }
  if (action == 'deposit') {
    const reserve = reserves[params[0]];
    const token = tokens[params[0]];
    const user = params[1];
    const amount = web3.utils.toWei(params[2]);
    if (privateKeyRequired) {
      kit.addAccount(params[3]);
    }
    if (params[0] === 'celo') {
      try {
        await retry(() => lendingPool.methods.deposit(reserve, amount, 0).estimateGas({from: user, gas: 1000000, value: amount}));
      } catch (err) {
        console.log('Cannot deposit', err.message);
        return;
      }
      console.log('Deposit', (await lendingPool.methods.deposit(reserve, amount, 0).send({from: user, gas: 1000000, value: amount})).transactionHash);
    } else {
      console.log('Approve', (await (await token.approve(lendingPoolCore.options.address, amount).send({from: user, gas: 1000000})).receiptFuture.promise).transactionHash);
      try {
        await retry(() => lendingPool.methods.deposit(reserve, amount, 0).estimateGas({from: user, gas: 1000000}));
      } catch (err) {
        console.log('Revoke approve', (await (await token.approve(lendingPoolCore.options.address, 0).send({from: user, gas: 1000000})).receiptFuture.promise).transactionHash);
        console.log('Cannot deposit', err.message);
        return;
      }
      console.log('Deposit', (await lendingPool.methods.deposit(reserve, amount, 0).send({from: user, gas: 1000000})).transactionHash);
    }
    return;
  }
  if (action == 'borrow') {
    const reserve = reserves[params[0]];
    const user = params[1];
    const amount = web3.utils.toWei(params[2]);
    const rate = INTEREST_RATE[params[3].toUpperCase()];
    if (privateKeyRequired) {
      kit.addAccount(params[4]);
    }
    try {
      await retry(() => lendingPool.methods.borrow(reserve, amount, rate, 0).estimateGas({from: user, gas: 1000000}));
    } catch (err) {
      console.log('Cannot borrow', err.message);
      return;
    }
    console.log('Borrow', (await lendingPool.methods.borrow(reserve, amount, rate, 0).send({from: user, gas: 1000000})).transactionHash);
    return;
  }
  if (action == 'repay') {
    const reserve = reserves[params[0]];
    const token = tokens[params[0]];
    const user = params[1];
    const amount = params[2] === 'all' ? maxUint256 : web3.utils.toWei(params[2]);
    let value = 0;
    if (params[0] === 'celo') {
      value = amount;
      if (amount === maxUint256) {
        const reserveData = await lendingPool.methods.getUserReserveData(reserve, user).call();
        value = BN(reserveData.currentBorrowBalance).multipliedBy('1.001').plus(reserveData.originationFee).toFixed(0);
      }
    }
    if (privateKeyRequired) {
      kit.addAccount(params[3]);
    }
    if (params[0] !== 'celo') {
      console.log('Approve', (await (await token.approve(lendingPoolCore.options.address, amount).send({from: user, gas: 1000000})).receiptFuture.promise).transactionHash);
    }
    try {
      await retry(() => lendingPool.methods.repay(reserve, amount, user).estimateGas({from: user, gas: 1000000, value}));
    } catch (err) {
      console.log('Revoke approve', (await (await token.approve(lendingPoolCore.options.address, 0).send({from: user, gas: 1000000})).receiptFuture.promise).transactionHash);
      console.log('Cannot repay', err.message);
      return;
    }
    console.log('Repay', (await lendingPool.methods.repay(reserve, amount, user).send({from: user, gas: 1000000, value})).transactionHash);
    if (params[0] !== 'celo' && amount === maxUint256) {
      console.log('Revoke approve', (await (await token.approve(lendingPoolCore.options.address, 0).send({from: user, gas: 1000000})).receiptFuture.promise).transactionHash);
    }
    return;
  }
  if (action == 'redeem') {
    const reserve = reserves[params[0]];
    const mtoken = new eth.Contract(AToken, (await lendingPool.methods.getReserveData(reserve).call()).aTokenAddress);
    const user = params[1];
    const amount = params[2] === 'all' ? maxUint256 : web3.utils.toWei(params[2]);
    if (privateKeyRequired) {
      kit.addAccount(params[3]);
    }
    try {
      await retry(() => mtoken.methods.redeem(amount).estimateGas({from: user, gas: 1000000}));
    } catch (err) {
      console.log('Cannot redeem', err.message);
      return;
    }
    console.log('Redeem', (await mtoken.methods.redeem(amount).send({from: user, gas: 1000000})).transactionHash);
    return;
  }
  console.error(`Unknown action: ${action}`);
  printActions();
}

execute(...process.argv.slice(2).map(arg => arg.toLowerCase()));
