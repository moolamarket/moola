# moola

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
