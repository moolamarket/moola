# moola

## Cli Usage

Private key might not be needed to send transactions if prive node URL provided.

```
cd aave-protocol && npm install
node cli

Usage: test|main|URL action params
Available actions:
balanceOf celo|cusd address
getUserReserveData celo|cusd address
getReserveData celo|cusd
getUserAccountData celo|cusd address
deposit celo|cusd address amount [privateKey]
borrow celo|cusd address amount stable|variable [privateKey]
repay celo|cusd address amount|all [privateKey]
redeem celo|cusd address amount|all [privateKey]
```

### Example usage

```
node cli test getUserAccountData 0xd7ec16ff15cA494e7B5901CcDc62e86775401A89
node cli test getUserReserveData celo 0xD1F14A379F3e8dDFFF32c336153AEb984acecD25
node cli test getReserveData cusd
node cli test balanceOf cusd 0xd7ec16ff15cA494e7B5901CcDc62e86775401A89
```

## Mainnet deployment and testing log.

```
Deploy start.
0xB5d3a65803E87756c997679453DD9d92556314e2 deployer address.
0.101 Alice cUSD balance.
1.6832379035 Alice CELO balance.
4.714 Bob cUSD balance.
0.200643215 Bob CELO balance.
0x7AAaD5a5fa74Aec83b74C2a098FBC86E17Ce4aEA LendingPoolAddressesProvider deployed.
0x7f4bdaAE4098eB72E7Bf63c10aE84643B2A2FFcB LendingPoolLiquidationManager deployed.
0xE0D321c937E7d8fd449Cf3a55093fDc43F070903 LendingPoolParametersProvider deployed.
0xf2df60BB0bD1F5f8b32bceb9D01c853452c7E9f5 PARAMETERS_PROVIDER proxy.
0x459D19B877597EE65a5Bdbf6735951302b672601 FeeProvider deployed.
0x90412E18193243C075887526589b9918a0b45247 FEE_PROVIDER proxy.
0x7BB931E439faD8f4eba8E8c49DAE7cFba7F5fF9e LendingPoolConfigurator deployed.
0xE86256316Ca7F8C2211c9204E8F23B484285D5F1 LENDING_POOL_CONFIGURATOR proxy.
0x3Ef32b4a35C58B2B7cDF87814094068AE3850f8A CoreLibrary deployed.
0x1d89Fb4E6a84bd7334D49AcBF0D39AC6Bcf595CD LendingPoolCore deployed.
0xAF106F8D4756490E7069027315F4886cc94A8F73 LENDING_POOL_CORE proxy.
0x399B4461F2c3c1f54e1DfEb4Af2b5f4bE2128EeC LendingPoolDataProvider deployed.
0xB1f1904b339BA1CdA1Ac3E866f497F55a52320E5 DATA_PROVIDER proxy.
0xF1c906cd0f5519D32BEC7b37C1EB7bD9F5c382c3 LendingPool deployed.
0xc1548F5AA1D76CDcAB7385FA6B5cEA70f941e535 LENDING_POOL proxy.
0x83602e79d4d817ECDCaeA04484bB86fC5ad965d0 LendingRateOracle deployed.
0xeA34FbcB12cc3bB22ea269f6FBAd999233F655cf PriceOracle deployed.
0x3aAd7400b796523904528F2BDa8fbC27B1B7b621 CeloProxyPriceProvider deployed.
0x27AdaB35e93eEAc9Ae146ba992DC4A5fE3E10648 TokenDistributor deployed.
0x7937Fc789a1f6387eCfA3A05Be730bd21a97dA5A InitializableAdminUpgradeabilityProxy deployed.
0x7937Fc789a1f6387eCfA3A05Be730bd21a97dA5A TokenDistributor proxy deployed.
Token distributor init done.
0x391c7F35cD1917E83a6c506E590381F2c79E09b9 OptimizedReserveInterestRateStrategy deployed.
0x7037F7296B2fc7908de7b57a89efaa8319f0C500 AToken.
0x7037F7296B2fc7908de7b57a89efaa8319f0C500 mCELO AToken deployed.
0x64dEFa3544c695db8c535D289d843a189aa26b98 AToken.
0x64dEFa3544c695db8c535D289d843a189aa26b98 mCUSD AToken deployed.
CELO as collateral enabled.
cUSD as collateral enabled.
CELO borrowing enabled.
cUSD borrowing enabled.
Deploy done.
Test start.
0.101 Alice cUSD balance.
1.6669717105 Alice CELO balance.
4.714 Bob cUSD balance.
0.200643215 Bob CELO balance.
0.1 CELO deposited by Alice.
0.1 cUSD deposited by Bob.
Before borrowing.
0.101 Alice cUSD balance.
1.566828288 Alice CELO balance.
4.614 Bob cUSD balance.
0.200482248 Bob CELO balance.
Alice borrows 0.001 cUSD at stable rate.
0.102 Alice cUSD balance.
1.5666398875 Alice CELO balance.
4.614 Bob cUSD balance.
0.200482248 Bob CELO balance.
Bob borrows 0.001 CELO at stable rate.
0.102 Alice cUSD balance.
1.5666398875 Alice CELO balance.
4.614 Bob cUSD balance.
0.2013108455 Bob CELO balance.
Alice repays 0.001 cUSD.
0.100997499988901573 Alice cUSD balance.
1.566562412 Alice CELO balance.
4.614 Bob cUSD balance.
0.2013108455 Bob CELO balance.
Bob repays 0.001 CELO.
0.100997499988901573 Alice cUSD balance.
1.566562412 Alice CELO balance.
4.614 Bob cUSD balance.
0.200255751990487062 Bob CELO balance.
Alice borrows 0.01 cUSD at variable rate.
0.110997499988901573 Alice cUSD balance.
1.566397098 Alice CELO balance.
4.614 Bob cUSD balance.
0.200255751990487062 Bob CELO balance.
Bob borrows 0.01 CELO at variable rate.
0.110997499988901573 Alice cUSD balance.
1.566397098 Alice CELO balance.
4.614 Bob cUSD balance.
0.210107435990487062 Bob CELO balance.
Alice repays 0.01 cUSD.
0.100972499932528609 Alice cUSD balance.
1.566323271 Alice CELO balance.
4.614 Bob cUSD balance.
0.210107435990487062 Bob CELO balance.
Bob repays 0.01 CELO.
0.100972499932528609 Alice cUSD balance.
1.566323271 Alice CELO balance.
4.614 Bob cUSD balance.
0.200027997434114098 Bob CELO balance.
Alice redeems CELO.
Bob redeems cUSD.
0.100972499932528609 Alice cUSD balance.
1.666256414565885901 Alice CELO balance.
4.714000000067471391 Bob cUSD balance.
0.199940560434114098 Bob CELO balance.
Test done.
```

## Alfajores deployment and testing log.

```
Deploy start.
0xd7ec16ff15cA494e7B5901CcDc62e86775401A89 deployer address.
17.991297499963901018 Alice cUSD balance.
2.51387071 Alice CELO balance.
9.8 Bob cUSD balance.
5.001345023 Bob CELO balance.
0x6EAE47ccEFF3c3Ac94971704ccd25C7820121483 LendingPoolAddressesProvider deployed.
0x3ff13c85c827978Dc51DB96cfb5F4aB9630cD146 LendingPoolLiquidationManager deployed.
0xfdd9e4a388C65f8e3bE0aE813269e23AfF55Bf10 LendingPoolParametersProvider deployed.
0x5e2C9507F42ed86218B542AC7aC80BF02fFbF878 PARAMETERS_PROVIDER proxy.
0xd2787957A915dD942A44551A6D38CCFAac503226 FeeProvider deployed.
0xf2f6dc5bCD7069CDEca0708DffAdC3F4EB36A1A6 FEE_PROVIDER proxy.
0xb5adD44caf2EAA34F08886A43f48454B63BA01F2 LendingPoolConfigurator deployed.
0x4fcB9724fF87409A8bf6f7b5D43E694D62dec3bC LENDING_POOL_CONFIGURATOR proxy.
0x333C1f4977f8F3482b3edD580A99f3958F377399 CoreLibrary deployed.
0x6589A843a6d190E97A945eC8cEeb20661977b327 LendingPoolCore deployed.
0x090D652d1Bb0FEFbEe2531e9BBbb3604bE71f5de LENDING_POOL_CORE proxy.
0x33e3C5e81E9A66573AeC7CEE85626Becf4073379 LendingPoolDataProvider deployed.
0xAa182922d8F3C3c6Cf189ecD1EEEefdC344279F3 DATA_PROVIDER proxy.
0xAB9eA245B2b5F8069f6e5db8756A41D57C6D1570 LendingPool deployed.
0x0886f74eEEc443fBb6907fB5528B57C28E813129 LENDING_POOL proxy.
0x0a5D5aB9Fbd5680828a19c13Eb54838287040b8B LendingRateOracle deployed.
0xd3e6Fd7c927c02b4599BbA8c46a5ca6D85E9E6f1 PriceOracle deployed.
0xAbd4cF2c318e22fd6479D0Af97b695F38185Fc51 CeloProxyPriceProvider deployed.
0xB3e6ad08dc0f0964849bf3375bf4c40b7d9150c4 TokenDistributor deployed.
0x91DcB7c3D167b6AEA036F4Dcdab2913F6e3c21fA InitializableAdminUpgradeabilityProxy deployed.
0x91DcB7c3D167b6AEA036F4Dcdab2913F6e3c21fA TokenDistributor proxy deployed.
Token distributor init done.
0x0A09C78F39C080087B5a9dF8E267A8F129dA8505 OptimizedReserveInterestRateStrategy deployed.
0x86f61EB83e10e914fc6F321F5dD3c2dD4860a003 AToken.
0x86f61EB83e10e914fc6F321F5dD3c2dD4860a003 mCELO AToken deployed.
0x71DB38719f9113A36e14F409bAD4F07B58b4730b AToken.
0x71DB38719f9113A36e14F409bAD4F07B58b4730b mCUSD AToken deployed.
CELO as collateral enabled.
cUSD as collateral enabled.
CELO borrowing enabled.
cUSD borrowing enabled.
Deploy done.
Test start.
0.1 CELO deposited by Alice.
0.1 cUSD deposited by Bob.
Before.
17.991297499963901018 Alice cUSD balance.
2.3974610885 Alice CELO balance.
9.7 Bob cUSD balance.
5.001184056 Bob CELO balance.
Alice borrows 0.001 cUSD at stable rate.
17.992297499963901018 Alice cUSD balance.
2.397272688 Alice CELO balance.
9.7 Bob cUSD balance.
5.001184056 Bob CELO balance.
Bob borrows 0.001 CELO at stable rate.
17.992297499963901018 Alice cUSD balance.
2.397272688 Alice CELO balance.
9.7 Bob cUSD balance.
5.0020126535 Bob CELO balance.
Alice repays 0.001 cUSD.
17.991294999952802591 Alice cUSD balance.
2.3971952125 Alice CELO balance.
9.7 Bob cUSD balance.
5.0020126535 Bob CELO balance.
Bob repays 0.001 CELO.
17.991294999952802591 Alice cUSD balance.
2.3971952125 Alice CELO balance.
9.7 Bob cUSD balance.
5.000957559990487062 Bob CELO balance.
Alice borrows 0.01 cUSD at variable rate.
18.001294999952802591 Alice cUSD balance.
2.3970298985 Alice CELO balance.
9.7 Bob cUSD balance.
5.000957559990487062 Bob CELO balance.
Bob borrows 0.01 CELO at variable rate.
18.001294999952802591 Alice cUSD balance.
2.3970298985 Alice CELO balance.
9.7 Bob cUSD balance.
5.010809243990487062 Bob CELO balance.
Alice repays 0.01 cUSD.
17.991269999896429627 Alice cUSD balance.
2.3969560715 Alice CELO balance.
9.7 Bob cUSD balance.
5.010809243990487062 Bob CELO balance.
Bob repays 0.01 CELO.
17.991269999896429627 Alice cUSD balance.
2.3969560715 Alice CELO balance.
9.7 Bob cUSD balance.
5.000729805434114098 Bob CELO balance.
Alice redeems CELO.
Bob redeems cUSD.
17.991269999896429627 Alice cUSD balance.
2.496889215065885901 Alice CELO balance.
9.800000000067471391 Bob cUSD balance.
5.000642368434114098 Bob CELO balance.
Test done.
```
