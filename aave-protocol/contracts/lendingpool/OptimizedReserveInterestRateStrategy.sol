pragma solidity ^0.5.0;

import "../interfaces/IReserveInterestRateStrategy.sol";
import "../libraries/WadRayMath.sol";
import "../configuration/LendingPoolAddressesProvider.sol";
import "./LendingPoolCore.sol";
import "../interfaces/ILendingRateOracle.sol";

import "@openzeppelin/contracts/math/SafeMath.sol";

/**
* @title DoubleSlopeInterestRateStrategyBase contract
* @notice implements the base functions needed for the InterestRateStrategy contracts
* @author Aave
**/
contract DoubleSlopeInterestRateStrategyBase is IReserveInterestRateStrategy {
    using WadRayMath for uint256;
    using SafeMath for uint256;

    LendingPoolAddressesProvider public addressesProvider;

    //base variable borrow rate when Utilization rate = 0. Expressed in ray
    uint256 internal baseVariableBorrowRate;

    //slope of the variable interest curve when utilization rate > 0 and <= OPTIMAL_UTILIZATION_RATE. Expressed in ray
    uint256 internal variableRateSlope1;

    //slope of the variable interest curve when utilization rate > OPTIMAL_UTILIZATION_RATE. Expressed in ray
    uint256 internal variableRateSlope2;

    //slope of the stable interest curve when utilization rate > 0 and <= OPTIMAL_UTILIZATION_RATE. Expressed in ray
    uint256 internal stableRateSlope1;

    //slope of the stable interest curve when utilization rate > OPTIMAL_UTILIZATION_RATE. Expressed in ray
    uint256 internal stableRateSlope2;

    constructor(
        LendingPoolAddressesProvider _provider,
        uint256 _baseVariableBorrowRate,
        uint256 _variableRateSlope1,
        uint256 _variableRateSlope2,
        uint256 _stableRateSlope1,
        uint256 _stableRateSlope2
    ) public {
        addressesProvider = _provider;
        baseVariableBorrowRate = _baseVariableBorrowRate;
        variableRateSlope1 = _variableRateSlope1;
        variableRateSlope2 = _variableRateSlope2;
        stableRateSlope1 = _stableRateSlope1;
        stableRateSlope2 = _stableRateSlope2;
    }


    /**
    * @dev accessors
    */

    function getVariableRateSlope1() external view returns (uint256) {
        return variableRateSlope1;
    }

    function getVariableRateSlope2() external view returns (uint256) {
        return variableRateSlope2;
    }

    function getStableRateSlope1() external view returns (uint256) {
        return stableRateSlope1;
    }

    function getStableRateSlope2() external view returns (uint256) {
        return stableRateSlope2;
    }

    function getBaseVariableBorrowRate() external view returns (uint256) {
        return baseVariableBorrowRate;
    }


    /**
    * @dev calculates the liquidity, stable, and variable rates depending on the current utilization rate
    *      and the base parameters
    *
    */
    function calculateInterestRates(
        address _reserve,
        uint256 _utilizationRate,
        uint256 _totalBorrowsStable,
        uint256 _totalBorrowsVariable,
        uint256 _averageStableBorrowRate
    )
        external
        view
        returns (uint256 liquidityRate, uint256 stableBorrowRate, uint256 variableBorrowRate);

    /**
    * @dev calculates the interest rates depending on the available liquidity and the total borrowed.
    * @param _reserve the address of the reserve
    * @param _availableLiquidity the liquidity available in the reserve
    * @param _totalBorrowsStable the total borrowed from the reserve a stable rate
    * @param _totalBorrowsVariable the total borrowed from the reserve at a variable rate
    * @param _averageStableBorrowRate the weighted average of all the stable rate borrows
    * @param _optimalRatio the optimal target ratio after which slope 2 is used
    * @return the liquidity rate, stable borrow rate and variable borrow rate calculated from the input parameters
    **/
    function calculateInterestRatesInternal(
        address _reserve,
        uint256 _availableLiquidity,
        uint256 _totalBorrowsStable,
        uint256 _totalBorrowsVariable,
        uint256 _averageStableBorrowRate,
        uint256 _optimalRatio
    )
        internal
        view
        returns (
            uint256 currentLiquidityRate,
            uint256 currentStableBorrowRate,
            uint256 currentVariableBorrowRate
        )
    {
        uint256 excessRatio = WadRayMath.ray() - _optimalRatio;

        uint256 totalBorrows = _totalBorrowsStable.add(_totalBorrowsVariable);

        uint256 utilizationRate = (totalBorrows == 0 && _availableLiquidity == 0)
            ? 0
            : totalBorrows.rayDiv(_availableLiquidity.add(totalBorrows));

        currentStableBorrowRate = ILendingRateOracle(addressesProvider.getLendingRateOracle())
            .getMarketBorrowRate(_reserve);

        if (utilizationRate > _optimalRatio) {
            uint256 excessUtilizationRateRatio = utilizationRate.sub(_optimalRatio).rayDiv(
                excessRatio
            );

            currentStableBorrowRate = currentStableBorrowRate.add(stableRateSlope1).add(
                stableRateSlope2.rayMul(excessUtilizationRateRatio)
            );

            currentVariableBorrowRate = baseVariableBorrowRate.add(variableRateSlope1).add(
                variableRateSlope2.rayMul(excessUtilizationRateRatio)
            );
        } else {
            currentStableBorrowRate = currentStableBorrowRate.add(
                stableRateSlope1.rayMul(utilizationRate.rayDiv(_optimalRatio))
            );
            currentVariableBorrowRate = baseVariableBorrowRate.add(
                utilizationRate.rayDiv(_optimalRatio).rayMul(variableRateSlope1)
            );
        }

        currentLiquidityRate = getOverallBorrowRateInternal(
            _totalBorrowsStable,
            _totalBorrowsVariable,
            currentVariableBorrowRate,
            _averageStableBorrowRate
        )
            .rayMul(utilizationRate);

    }

    /**
    * @dev calculates the overall borrow rate as the weighted average between the total variable borrows and total stable borrows.
    * @param _totalBorrowsStable the total borrowed from the reserve a stable rate
    * @param _totalBorrowsVariable the total borrowed from the reserve at a variable rate
    * @param _currentVariableBorrowRate the current variable borrow rate
    * @param _currentAverageStableBorrowRate the weighted average of all the stable rate borrows
    * @return the weighted averaged borrow rate
    **/
    function getOverallBorrowRateInternal(
        uint256 _totalBorrowsStable,
        uint256 _totalBorrowsVariable,
        uint256 _currentVariableBorrowRate,
        uint256 _currentAverageStableBorrowRate
    ) internal pure returns (uint256) {
        uint256 totalBorrows = _totalBorrowsStable.add(_totalBorrowsVariable);

        if (totalBorrows == 0) return 0;

        uint256 weightedVariableRate = _totalBorrowsVariable.wadToRay().rayMul(
            _currentVariableBorrowRate
        );

        uint256 weightedStableRate = _totalBorrowsStable.wadToRay().rayMul(
            _currentAverageStableBorrowRate
        );

        uint256 overallBorrowRate = weightedVariableRate.add(weightedStableRate).rayDiv(
            totalBorrows.wadToRay()
        );

        return overallBorrowRate;
    }
}


/**
* @title OptimizedReserveInterestRateStrategy contract
* @notice implements a double slope interest rate model with 91% optimal threshold.
* @author Aave
**/
contract OptimizedReserveInterestRateStrategy is DoubleSlopeInterestRateStrategyBase {
    /**
    * @dev this constant represents the utilization rate at which the pool aims to obtain most competitive borrow rates
    * expressed in ray
    **/
    uint256 public constant OPTIMAL_UTILIZATION_RATE = 0.90 * 1e27;

    constructor(
        LendingPoolAddressesProvider _provider,
        uint256 _baseVariableBorrowRate,
        uint256 _variableRateSlope1,
        uint256 _variableRateSlope2,
        uint256 _stableRateSlope1,
        uint256 _stableRateSlope2
    )
    DoubleSlopeInterestRateStrategyBase(
            _provider,
            _baseVariableBorrowRate,
            _variableRateSlope1,
            _variableRateSlope2,
            _stableRateSlope1,
            _stableRateSlope2
        )
        public
    {}

    /**
    * @dev calculates the interest rates depending on the available liquidity and the total borrowed.
    * @param _reserve the address of the reserve
    * @param _availableLiquidity the liquidity available in the reserve
    * @param _totalBorrowsStable the total borrowed from the reserve a stable rate
    * @param _totalBorrowsVariable the total borrowed from the reserve at a variable rate
    * @param _averageStableBorrowRate the weighted average of all the stable rate borrows
    * @return the liquidity rate, stable borrow rate and variable borrow rate calculated from the input parameters
    **/
    function calculateInterestRates(
        address _reserve,
        uint256 _availableLiquidity,
        uint256 _totalBorrowsStable,
        uint256 _totalBorrowsVariable,
        uint256 _averageStableBorrowRate
    )
        external
        view
        returns (
            uint256 currentLiquidityRate,
            uint256 currentStableBorrowRate,
            uint256 currentVariableBorrowRate
        )
    {
        return
            super.calculateInterestRatesInternal(
                _reserve,
                _availableLiquidity,
                _totalBorrowsStable,
                _totalBorrowsVariable,
                _averageStableBorrowRate,
                OPTIMAL_UTILIZATION_RATE
            );
    }

}
