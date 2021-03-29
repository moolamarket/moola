pragma solidity ^0.5.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

import "../interfaces/IPriceOracleGetter.sol";
import "../libraries/EthAddressLib.sol";

interface ISortedOracles {
    function medianRate(address) external view returns (uint256, uint256);
    function medianTimestamp(address) external view returns (uint256);
}

interface IRegistry {
    function getAddressForOrDie(bytes32) external view returns (address);
}

contract UsingRegistry {
    bytes32 constant GOLD_TOKEN_REGISTRY_ID = keccak256(abi.encodePacked("GoldToken"));
    bytes32 constant SORTED_ORACLES_REGISTRY_ID = keccak256(abi.encodePacked("SortedOracles"));

    IRegistry constant public registry = IRegistry(0x000000000000000000000000000000000000ce10);

    function getGoldToken() internal view returns (address) {
        return registry.getAddressForOrDie(GOLD_TOKEN_REGISTRY_ID);
    }

    function getSortedOracles() internal view returns (ISortedOracles) {
        return ISortedOracles(registry.getAddressForOrDie(SORTED_ORACLES_REGISTRY_ID));
    }
}

/// @title CeloProxyPriceProvider
/// @author Moola
/// @notice Proxy smart contract to get the price of an asset from a price source, with Celo SortedOracles
///         smart contracts as primary option
/// - If the returned price by a SortedOracles is <= 0, the call is forwarded to a fallbackOracle
/// - Owned by the Aave governance system, allowed to add sources for assets, replace them
///   and change the fallbackOracle
contract CeloProxyPriceProvider is IPriceOracleGetter, Ownable, UsingRegistry {
    using SafeMath for uint256;

    event AssetSourceUpdated(address indexed asset, address indexed source);
    event FallbackOracleUpdated(address indexed fallbackOracle);

    IPriceOracleGetter private fallbackOracle;

    /// @notice Constructor
    /// @param _fallbackOracle The address of the fallback oracle to use if the data of an
    ///        aggregator is not consistent
    constructor(address _fallbackOracle) public {
        internalSetFallbackOracle(_fallbackOracle);
    }

    /// @notice Sets the fallbackOracle
    /// - Callable only by the Aave governance
    /// @param _fallbackOracle The address of the fallbackOracle
    function setFallbackOracle(address _fallbackOracle) external onlyOwner {
        internalSetFallbackOracle(_fallbackOracle);
    }

    /// @notice Internal function to set the fallbackOracle
    /// @param _fallbackOracle The address of the fallbackOracle
    function internalSetFallbackOracle(address _fallbackOracle) internal {
        fallbackOracle = IPriceOracleGetter(_fallbackOracle);
        emit FallbackOracleUpdated(_fallbackOracle);
    }

    /// @notice Gets an asset price by address
    /// @param _asset The asset address
    function getAssetPrice(address _asset) public view returns(uint256) {
        if (_asset == EthAddressLib.ethAddress()) {
            return 1 ether;
        }
        if (_asset == getGoldToken()) {
            return 1 ether;
        }
        uint256 _price;
        uint256 _divisor;
        ISortedOracles _oracles = getSortedOracles();
        (_price, _divisor) = _oracles.medianRate(_asset);
        require(_price > 0, "Reported price is 0");
        uint _reportTime = _oracles.medianTimestamp(_asset);
        require(block.timestamp.sub(_reportTime) < 10 minutes, "Reported price is older than 10 minutes");
        return _divisor.mul(1 ether).div(_price);
    }

    /// @notice Gets a list of prices from a list of assets addresses
    /// @param _assets The list of assets addresses
    function getAssetsPrices(address[] calldata _assets) external view returns(uint256[] memory) {
        uint256[] memory prices = new uint256[](_assets.length);
        for (uint256 i = 0; i < _assets.length; i++) {
            prices[i] = getAssetPrice(_assets[i]);
        }
        return prices;
    }

    /// @notice Gets the address of the fallback oracle
    /// @return address The addres of the fallback oracle
    function getFallbackOracle() external view returns(address) {
        return address(fallbackOracle);
    }
}
