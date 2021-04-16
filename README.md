# moola

## Cli Usage

Private key might not be needed to send transactions if private node URL provided.

```
cd aave-protocol && npm install
node cli

Usage: test|main|URL action params
Available actions:
balanceOf celo|cusd address
getUserReserveData celo|cusd address
getReserveData celo|cusd
getUserAccountData address
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

Updated PriceOracle to: 0x88A4a87eF224D8b1F463708D0CD62b17De593DAd, tx: 0x5a8fed525f47894d5bee963b8be0f4a1975b74d2300d1ca1fd1e0b5cef3a63ed
Updated LendingPool to 0x3: 0xE15FEBDc920022347231e6Ae176836B4946a8e07, tx: 0xa0a5da930d057a3cde4ad4fc49564259df9abd06f1d2052e7b3a02fd1a45266e
Initialize LendingPool 0x3 prototype tx: 0xc9d5033c3139d30d6f1b2fa2211bc0ff54b1b4b61985121c2d7421d091b1736e
```

# Lending Pool
The `LendingPool` contract is the main contract of the protocol. It exposes all the user-oriented actions that can be invoked using either Solidity or web3 libraries.

Web3 code samples exclude the imports and transaction related parts to focus on methods interactions.

## Methods
### deposit()
**`function deposit( address _reserve, uint256 _amount, uint16 _referralCode)`**

Deposits a certain `_amount` of an asset specified by the `_reserve` parameter.

The caller receives a certain amount of corresponding aTokens in exchange. The amount of aTokens received depends on the corresponding aToken **exchange rate**.

For `_referralCode`, you can use: 0.

> ❕ When depositing an ERC-20 token, the `LendingPoolCore` contract (which is **different** from the `LendingPool` contract) will need to have the relevant allowance via `approve()` of `_amount` for the underlying ERC20 of the `_reserve` asset you are depositing.

|Parameter Name  |Type   |Description                                 |
|----------------|-------|--------------------------------------------|
|`_reserve`      |address|address of the underlying asset​             |
|`_amount`       |uint256|amount deposited, expressed in decimal units|
|`_referralCode` |uint256|referral code for our referral program      |

### CELO deposits
Our protocol doesn't use any ERC20 wrapper such as CELO duality token for CELO deposits, therefore amount parameter of `deposit()` method must match the `msg.value` parameter of the transaction, and be included in your `deposit()` call. 

E.g: `lendingPool.deposit{ value: msg.value }(reserve, msg.value, referralCode)`

> 🛈 Since CELO is used directly in the protocol, we use a mock address to indicate CELO: `0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE`

### ERC20 deposits
The `_reserve` parameter corresponds to the ERC20 contract address of the underlying asset.

### setUserUseReserveAsCollateral()
**`function setUserUseReserveAsCollateral(address _reserve, bool _useAsCollateral)`**

Enable the user's specific deposit to be used as collateral. Users will only be able to disable deposits that are not currently being used as collateral.

|Parameter Name     |Type   |Description                                             |
|-------------------|-------|--------------------------------------------------------|
|`_reserve`         |address|address of the underlying asset​                         |
|`_useAsCollateral` |bool   |if true, the asset is allowed as a collateral for borrow|

### borrow()
**`function borrow(address _reserve, uint256 _amount, uint256 _interestRateMode, uint16 _referralCode)`**

Transfers  a specific amount of the asset identified by the `_reserve` parameter to the `msg.sender`, provided that the caller has preemptively deposited enough collateral to cover the borrow.

Every borrow can be opened with a **stable** or **variable** rate mode. Borrows have infinite duration and there is no repayment schedule. In case of price fluctuations, a borrow position is liquidated if the price of the collateral drops below a certain threshold.

For `_referralCode`, you can use: 0.

|Parameter Name     |Type   |Description                                             |
|-------------------|-------|--------------------------------------------------------|
|`_reserve`         |address|address of the underlying asset​                         |
|`_amount`          |uint256|amount to borrow, expressed in decimal units            |
|`_interestRateMode`|uint256|type of interest rate mode to use, with **2** representing variable rate and **1** representing stable rate|
|`_referralCode`    |uint256|referral code for our referral program                  |

### repay()
**`function repay( address _reserve, uint256 _amount, address payable _onBehalfOf)`**

Repay a borrowed asset, either fully or partially. The `_onBehalfOf` parameter can be used to repay the debt of a different user.

> ❕ When a third-party is repaying another `user` debt on their behalf, the third-party address needs to `approve()` the `LendingPoolCore` contract (which is **different** from the `LendingPool` contract) with `_amount` of the underlying ERC20 of the  `_reserve` contract.

|Parameter Name     |Type   |Description                                             |
|-------------------|-------|--------------------------------------------------------|
|`_reserve`         |address|address of the underlying asset​                         |
|`_amount`          |uint256|amount to repay, expressed in decimal units. To repay the whole borrowed amount, the function accepts `uint(-1)` as a value for `_amount`, **ONLY** when the repayment is not executed on behalf of a 3rd party. In case of repayments on behalf of another user, it's recommended to send an `_amount` slightly higher than the current borrowed amount.|
|`_onBehalfOf`      |address payable|address to repay on behalf of. If the caller is repaying their own loan, then this value should be equal to `msg.sender`|

### swapBorrowRateMode()
**`function swapBorrowRateMode(address _reserve)`**

Swaps the `msg.sender`'s borrow rate modes between stable and variable.

|Parameter Name     |Type   |Description                                             |
|-------------------|-------|--------------------------------------------------------|
|`_reserve`         |address|address of the underlying asset​                         |

### rebalanceStableBorrowRate()
**`function rebalanceStableBorrowRate(address _reserve, address _user)`**

Rebalances the stable rate of `_user`. If the user is not borrowing at a stable rate or the conditions for the rebalance are not satisfied, the transaction gets reverted. 

|Parameter Name     |Type   |Description                                             |
|-------------------|-------|--------------------------------------------------------|
|`_reserve`         |address|address of the underlying asset​                         |
|`_user`            |address|address of the `user`​ to rebalance                      |

### liquidationCall()
**`function liquidationCall(address _collateral, address _reserve, address _user, uint256 _purchaseAmount, bool _receiveaToken)`**

Liquidate positions with a **health factor** below 1.

When the health factor of a position is below 1, liquidators repay part or all of the outstanding borrowed amount on behalf of the borrower, while **receiving a discounted amount of collateral** in return (also known as a liquidation 'bonus"). Liquidators can decide if they want to receive an equivalent amount of collateral mTokens, or the underlying asset directly. When the liquidation is completed successfully, the health factor of the position is increased, bringing the health factor above 1.

> 🛈 Liquidators can only close a certain amount of collateral defined by a close factor. Currently the **close factor is 0.5**. In other words, liquidators can only liquidate a maximum of 50% of the amount pending to be repaid in a position. The discount for liquidating is in terms of this amount.

> ❕ Liquidators must `approve()` the `LendingPoolCore` contract (which is **different** from the `LendingPool` contract) to use `_purchaseAmount` of the underlying ERC20 of the `_reserve` asset used for the liquidation.

#### NOTES

 - In most scenarios, profitable liquidators will choose to liquidate as
   much as they can (50% of the `_user` position).
   
 -  `_purchaseAmount` parameter can be set to `uint(-1)` and the protocol will proceed with the highest possible liquidation allowed by the
   close factor.
   
- For ETH liquidations, `msg.value` of the transaction should be equal to
   the `_purchaseAmount` parameter.
   
- To check a user's health factor, use `getUserAccountData()`.

|Parameter Name     |Type   |Description                                             |
|-------------------|-------|--------------------------------------------------------|
|`_collateral`      |address|address of the liquidated collateral reserve​            |
|`_reserve`         |address|address of the underlying asset for the loan            |
|`_user`            |address|address of the user borrowing                           |
|`_purchaseAmount`  |uint256|amount of the discounted purchase                       |
|`_receiveaToken`   |bool   |if true, the user receives the aTokens equivalent of the purchased collateral. If false, the user receives the underlying asset directly|

### flashLoan()
**`function flashLoan(address payable _receiver, address _reserve, uint _amount, bytes memory _params)`**

Allows the calling contract to borrow (without collateral) from the `_reserve` pool,  a certain `_amount` of liquidity, that must be returned before the end of the transaction.

Since the Flash Loan occurs within 1 transaction, it is only possible to call this function successfully on the smart contract level (i.e. Solidity or Vyper).

Flash Loans incur a *fee* of 0.09% of the loan amount.

|Parameter Name     |Type   |Description                                             |
|-------------------|-------|--------------------------------------------------------|
|`_receiver`        |address address of the `receiver` of the borrowed assets    ​    |
|`_reserve`         |address|address of the underlying asset                         |
|`_amount`          |uint256|amount to be received                                   |
|`_params`          |bytes  |bytes-encoded extra parameters to use inside the `executeOperation()` function|

## View Methods

### getReserveConfigurationData()
**`function getReserveConfigurationData(address _reserve)`**

Returns specific reserve's configuration parameters.

|`return` name              |Type   |Description                                             |
|---------------------------|-------|--------------------------------------------------------|
|ltv                        |uint256|Loan-to-value. Value in percentage|
|liquidationThreshold       |uint256|liquidation threshold. Value in percentage              |
|liquidationDiscount        |uint256|liquidation bonus. Value in percentage|
|interestRateStrategyAddress|address|address of the contract defining the interest rate strategy|
|usageAsCollateralEnabled   |bool   |if `true`, reserve asset can be used as collateral for borrowing|
|borrowingEnabled           |bool   |if `true`, reserve asset can be borrowed|
|stableBorrowRateEnabled    |bool   |if `true`, reserve asset can be borrowed with stable rate mode|
|isActive                   |bool   |if `true`, users can interact with reserve asset|

### getReserveData()
**`function getReserveData(address _reserve)`**

Returns global information on any asset `reserve` pool

|`return` name              |Type   |Description                                             |
|---------------------------|-------|--------------------------------------------------------|
|totalLiquidity             |uint256|`reserve` total liquidity|
|availableLiquidity         |uint256|`reserve` available liquidity for borrowing|
|totalBorrowsStable         |uint256|total amount of outstanding borrows at Stable rate|
|totalBorrowsVariable       |uint256|total amount of outstanding borrows at Variable rate|
|liquidityRate              |uint256|current deposit APY of the `reserve` for depositors, in Ray units|
|variableBorrowRate         |uint256|current variable rate APY of the `reserve` pool, in Ray units|
|stableBorrowRate           |uint256|current stable rate APY of the `reserve` pool, in Ray units|
|averageStableBorrowRate    |uint256|current average stable borrow rate|
|utilizationRate            |uint256|expressed as total borrows/total liquidity|
|liquidityIndex             |uint256|cumulative liquidity index|
|variableBorrowIndex        |uint256|cumulative variable borrow index|
|aTokenAddress              |address|mTokens contract address for the specific `_reserve`|
|lastUpdateTimestamp        |uint40 |timestamp of the last update of `reserve` data|

### getUserAccountData()
**`function getUserAccountData(address _user)`**

Returns information of a reserve exclusively related with a particular `user` address

|`return` name              |Type   |Description                                             |
|---------------------------|-------|--------------------------------------------------------|
|totalLiquidityETH          |uint256|`user` aggregated deposits across all the reserves. In Wei|
|totalCollateralETH         |uint256|`user` aggregated collateral across all the reserves. In Wei|
|totalBorrowsETH            |uint256|`user` aggregated outstanding borrows across all the reserves. In Wei|
|totalFeesETH               |uint256|`user` aggregated current outstanding fees in ETH. In Wei|
|availableBorrowsETH        |uint256|`user` available amount to borrow in ETH|
|currentLiquidationThreshold|uint256|`user` current average liquidation threshold across all the collaterals deposited|
|ltv                        |uint256|`user` average Loan-to-Value between all the collaterals|
|healthFactor               |uint256|`user` current Health Factor|

### getUserReserveData()
**`function getUserReserveData(address _reserve, address _user)`**

Returns information related to the `user` data on a specific `reserve`


|`return` name              |Type   |Description                                             |
|---------------------------|-------|--------------------------------------------------------|
|currentATokenBalance       |uint256|current `reserve` mToken balance|
|currentBorrowBalance       |uint256|`user` current `reserve` outstanding borrow balance|
|principalBorrowBalance     |uint256|`user` balance of borrowed asset|
|borrowRateMode             |uint256|`user` borrow rate mode either Stable or Variable|
|borrowRate                 |uint256|`user` current borrow rate APY|
|liquidityRate              |uint256|`user` current earn rate on `_reserve`|
|originationFee             |uint256|`user` outstanding loan origination fee|
|variableBorrowIndex        |uint256|`user` variable cumulative index|
|lastUpdateTimestamp        |uint256|Timestamp of the last data update|
|usageAsCollateralEnabled   |bool   |Whether the user's current reserve is enabled as a collateral|

### getReserves()
**`function getReserves()`**

Returns an array of all the active reserves addresses.

## Emitted Events
The `LendingPool` contract produces events that can be monitored on the Ethereum blockchain. For more information on emitted events and filters, refer to [the official solidity documentation.](https://solidity.readthedocs.io/en/latest/contracts.html#events)

In Moola protocol, `reserve` is defined by the smart-contract of the asset used for the method interaction. 

- A list of all smart-contract addresses is available in here. 
- To avoid the usage of a CELO wrapper throughout the protocol (such as CELO duality token), a mock address is used for the CELO reserve: `0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE`

### Deposit

|`return` name    |Type   |Description                                             |
|-----------------|-------|--------------------------------------------------------|
|_reserve         |address|address of the underlying asset|
|_user            |address|address of the `user`|
|_amount          |uint256|amount deposited, in Wei|
|_referral        |uint16 |`ReferralCode` for referral programs|
|_timestamp       |uint256|timestamp of the transaction, in Unix time|

### RedeemUnderlying

|`return` name    |Type   |Description                                             |
|-----------------|-------|--------------------------------------------------------|
|_reserve         |address|address of the underlying asset|
|_user            |address|address of the `user`|
|_amount          |uint256|amount redeemed, in Wei|
|_timestamp       |uint256|timestamp of the transaction, in Unix time|

### Borrow

|`return` name         |Type   |Description                                             |
|----------------------|-------|--------------------------------------------------------|
|_reserve              |address|address of the underlying asset|
|_user                 |address|address of the `user`|
|_amount               |uint256|amount borrowed, in Wei|
|_borrowRateMode       |uint16 |interest rate mode `0` for None, `1` for stable and `2` for variable|
|_borrowRate           |uint256|APY of the loan at the time of the `borrow()` call. in Wei|
|_originationFee       |uint256|amount of the `originationFee` of the loan, in Ray units|
|_borrowBalanceIncrease|uint256|amount of debt increased since the last update by the user, in Wei|
|_referral             |uint16 |`ReferralCode` for referral programs|
|_timestamp            |uint256|timestamp of the transaction, in Unix time|

### Repay

|`return` name         |Type   |Description                                             |
|----------------------|-------|--------------------------------------------------------|
|_reserve              |address|address of the underlying asset|
|_user                 |address|address of the `user`|
|_repayer              |address|address of the `repayer`|
|_amountMinusFees      |uint256|amount repayed, without fees|
|_fees                 |uint256|fees paid|
|_borrowBalanceIncrease|uint256|amount of debt increased since the last update by the user, in Wei|
|_timestamp            |uint256|timestamp of the transaction, in Unix time|

### Swap

|`return` name         |Type   |Description                                             |
|----------------------|-------|--------------------------------------------------------|
|_reserve              |address|address of the underlying asset|
|_user                 |address|address of the `user`|
|_newRateMode          |uint256|interest rate mode `0` for None, `1` for stable and `2` for variable|
|_newRate              |uint256|updated Rate APY, in Ray units|
|_borrowBalanceIncrease|uint256|amount of debt increased since the last update by the user, in Wei|
|_timestamp            |uint256|timestamp of the transaction, in Unix time|

### ReserveUsedAsCollateralEnabled

|`return` name         |Type   |Description                                             |
|----------------------|-------|--------------------------------------------------------|
|_reserve              |address|address of the underlying asset|
|_user                 |address|address of the `user`|

### ReserveUsedAsCollateralDisabled

|`return` name         |Type   |Description                                             |
|----------------------|-------|--------------------------------------------------------|
|_reserve              |address|address of the underlying asset|
|_user                 |address|address of the `user`|

### RebalanceStableBorrowRate

|`return` name         |Type   |Description                                             |
|----------------------|-------|--------------------------------------------------------|
|_reserve              |address|address of the underlying asset|
|_user                 |address|address of the `user`|
|_newStableRate        |uint256|updated Rate APY, in Ray units|
|_borrowBalanceIncrease|uint256|amount of debt increased by the new borrow, `0` if it's the first borrow, in Wei|
|_timestamp            |uint256|timestamp of the transaction, in Unix time|

### FlashLoan

|`return` name         |Type   |Description                                             |
|----------------------|-------|--------------------------------------------------------|
|_target               |address|address of the smart contract receiving the flashLoan, `flashLoanReceiver`|
|_reserve              |address|address of the underlying asset|
|_amount               |uint256|amount borrowed, in Wei|
|_totalFee             |uint256|FlashLoans fee paid by the borrower, currently set at 9 bps. In Wei|
|_protocolFee          |uint256|fee for the protocol, currently set at 30% of the `_totalFee` In Wei|
|_timestamp            |uint256|timestamp of the transaction, in Unix time|

### OriginationFeeLiquidated

|`return` name              |Type   |Description                                             |
|---------------------------|-------|--------------------------------------------------------|
|_collateral                |address|address of the contract of collateral asset being liquidated|
|_reserve                   |address|address of the underlying asset|
|_user                      |address|address of the `user` being liquidated|
|_feeLiquidated             |uint256|amount of the fee liquidated denominated in **borrowed currency**, in Wei|
|_liquidatedCollateralForFee|uint256|amount of collateral liquidated to pay for the fee + liquidation bonus, in Wei|
|_timestamp                 |uint256|timestamp of the transaction, in Unix time|

### LiquidationCall

|`return` name              |Type   |Description                                             |
|---------------------------|-------|--------------------------------------------------------|
|_collateral                |address|address of the contract of collateral asset being liquidated|
|_reserve                   |address|address of the underlying asset|
|_user                      |address|address of the `user` being liquidated|
|_purchaseAmount            |uint256|amount of the liquidation, in Wei|
|_liquidatedCollateralAmount|uint256|amount of collateral being liquidated|
|_accruedBorrowInterest     |uint256|amount of debt increased since the last update by the user, in Wei|
|_liquidator                |address|address of the liquidator|
|_receiveAToken             |bool   |`true` if the liquidator wants to receive mTokens, `false` otherwise|
|_timestamp                 |uint256|timestamp of the transaction, in Unix time|
