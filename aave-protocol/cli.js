const { newKit } = require('@celo/contractkit');
const LendingPoolAddressesProvider = require('./abi/LendingPoolAddressesProvider.json');
const LendingPool = require('./abi/LendingPool.json');
const LendingPoolCore = require('./abi/LendingPoolCore.json');
const LendingPoolDataProvider = require('./abi/LendingPoolDataProvider.json');
const AToken = require('./abi/AToken.json');
const CELOToken = require('./abi/AToken.json');
const CUSD = require('./abi/AToken.json');
const CEUR = require('./abi/AToken.json');
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

function printRayRate(num) {
  return BN(num).dividedBy(ray).multipliedBy(BN(100)).toFixed(2) + '%';
}

function printActions() {
  console.info('Available actions:');
  console.info('balanceOf celo|cusd|ceur address');
  console.info('getUserReserveData celo|cusd|ceur address');
  console.info('getReserveData celo|cusd|ceur');
  console.info('getUserAccountData address');
  console.info('deposit celo|cusd|ceur address amount [privateKey]');
  console.info('borrow celo|cusd|ceur address amount stable|variable [privateKey]');
  console.info('repay celo|cusd|ceur address amount|all [privateKey]');
  console.info('redeem celo|cusd|ceur address amount|all [privateKey]');
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
  let addressProvider;
  let CELO;
  let cUSD;
  let cEUR;
  let privateKeyRequired = true;
  switch (network) {
    case 'test':
      kit = newKit('https://alfajores-forno.celo-testnet.org');
      addressProvider = new kit.web3.eth.Contract(LendingPoolAddressesProvider, '0x6EAE47ccEFF3c3Ac94971704ccd25C7820121483');
      cEUR = new kit.web3.eth.Contract(CEUR, '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f');
      cUSD = new kit.web3.eth.Contract(CUSD, '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1');
      CELO = new kit.web3.eth.Contract(CELOToken, '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9');
      break;
    case 'main':
      kit = newKit('https://forno.celo.org');
      addressProvider = new kit.web3.eth.Contract(LendingPoolAddressesProvider, '0x7AAaD5a5fa74Aec83b74C2a098FBC86E17Ce4aEA');
      cEUR = new kit.web3.eth.Contract(CEUR, '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73');
      cUSD = new kit.web3.eth.Contract(CUSD, '0x765DE816845861e75A25fCA122bb6898B8B1282a');
      CELO = new kit.web3.eth.Contract(CELOToken, '0x471EcE3750Da237f93B8E339c536989b8978a438');
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
      cEUR = new kit.web3.eth.Contract(CEUR, '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73');
      cUSD = new kit.web3.eth.Contract(CUSD, '0x765DE816845861e75A25fCA122bb6898B8B1282a');
      CELO = new kit.web3.eth.Contract(CELOToken, '0x471EcE3750Da237f93B8E339c536989b8978a438');
      privateKeyRequired = false;
  }
  const web3 = kit.web3;
  const eth = web3.eth;

  const lendingPool = new eth.Contract(LendingPool, await addressProvider.methods.getLendingPool().call());
  const lendingPoolCore = new eth.Contract(LendingPoolCore, await addressProvider.methods.getLendingPoolCore().call());
  const lendingPoolDataProvider = new eth.Contract(LendingPoolDataProvider, await addressProvider.methods.getLendingPoolDataProvider().call());
  const tokens = {
    celo: CELO,
    cusd: cUSD,
    ceur: cEUR
  };


  const reserves = {
    celo: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    cusd: cUSD.options.address,
    ceur: cEUR.options.address,
  };
  if (action === 'balanceof') {
    const token = tokens[params[0]];
    const user = params[1];
    console.info(BN(((await token.methods.balanceOf(user).call()).toString())).div(ether).toFixed());
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
      BorrowRate: printRayRate(data.borrowRate),
      LiquidityRate: printRayRate(data.liquidityRate),
      OriginationFee: print(data.originationFee),
      BorrowIndex: printRay(data.variableBorrowIndex),
      LastUpdate: (new Date(BN(data.lastUpdateTimestamp).multipliedBy(1000).toNumber())).toLocaleString(),
      IsCollateral: data.usageAsCollateralEnabled,
    };
    console.table(parsedData);
    return;
  }
  if (action == 'getuseraccountdata') {
    const user = params[0];
    let data;
    try {
      data = await lendingPool.methods.getUserAccountData(user).call();
    } catch (err) {
      data = await lendingPoolDataProvider.methods.calculateUserGlobalData(user).call();
      data.availableBorrowsETH = 0;
    }
    const parsedData = {
      TotalLiquidity: print(data.totalLiquidityETH || data.totalLiquidityBalanceETH),
      TotalCollateral: print(data.totalCollateralETH || data.totalCollateralBalanceETH),
      TotalBorrow: print(data.totalBorrowsETH || data.totalBorrowBalanceETH),
      TotalFees: print(data.totalFeesETH),
      AvailableBorrow: print(data.availableBorrowsETH),
      LiquidationThreshold: `${data.currentLiquidationThreshold}%`,
      LoanToValue: `${data.ltv || data.currentLtv}%`,
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
      LiquidityRate: printRayRate(data.liquidityRate),
      VariableRate: printRayRate(data.variableBorrowRate),
      StableRate: printRayRate(data.stableBorrowRate),
      AverageStableRate: printRayRate(data.averageStableBorrowRate),
      UtilizationRate: printRayRate(data.utilizationRate),// Ut
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
        await retry(() => lendingPool.methods.deposit(reserve, amount, 0).estimateGas({from: user, gas: 2000000, value: amount}));
      } catch (err) {
        console.log('Cannot deposit', err.message);
        return;
      }
      console.log('Deposit', (await lendingPool.methods.deposit(reserve, amount, 0).send({from: user, gas: 2000000, value: amount})).transactionHash);
    } else {
      console.log('Approve', (await token.methods.approve(lendingPoolCore.options.address, amount).send({from: user, gas: 2000000})).transactionHash);
      try {
        await retry(() => lendingPool.methods.deposit(reserve, amount, 0).estimateGas({from: user, gas: 2000000}));
      } catch (err) {
        console.log('Revoke approve', (await token.methods.approve(lendingPoolCore.options.address, 0).send({from: user, gas: 2000000})).transactionHash);
        console.log('Cannot deposit', err.message);
        return;
      }
      console.log('Deposit', (await lendingPool.methods.deposit(reserve, amount, 0).send({from: user, gas: 2000000})).transactionHash);
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
      await retry(() => lendingPool.methods.borrow(reserve, amount, rate, 0).estimateGas({from: user, gas: 2000000}));
    } catch (err) {
      console.log('Cannot borrow', err.message);
      return;
    }
    console.log('Borrow', (await lendingPool.methods.borrow(reserve, amount, rate, 0).send({from: user, gas: 2000000})).transactionHash);
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
      console.log('Approve', (await token.methods.approve(lendingPoolCore.options.address, amount).send({from: user, gas: 2000000})).transactionHash);
    }
    try {
      await retry(() => lendingPool.methods.repay(reserve, amount, user).estimateGas({from: user, gas: 2000000, value}));
    } catch (err) {
      console.log('Revoke approve', (await token.methods.approve(lendingPoolCore.options.address, 0).send({from: user, gas: 2000000})).transactionHash);
      console.log('Cannot repay', err.message);// const pk = require('./pk2.json');

      return;
    }
    console.log('Repay', (await lendingPool.methods.repay(reserve, amount, user).send({from: user, gas: 2000000, value})).transactionHash);
    if (params[0] !== 'celo' && amount === maxUint256) {
      console.log('Revoke approve', (await token.methods.approve(lendingPoolCore.options.address, 0).send({from: user, gas: 2000000})).transactionHash);
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
      await retry(() => mtoken.methods.redeem(amount).estimateGas({from: user, gas: 2000000}));
    } catch (err) {
      console.log('Cannot redeem', err.message);
      return;
    }
    console.log('Redeem', (await mtoken.methods.redeem(amount).send({from: user, gas: 2000000})).transactionHash);
    return;
  }
  console.error(`Unknown action: ${action}`);
  printActions();
}

execute(...process.argv.slice(2).map(arg => arg.toLowerCase()));
