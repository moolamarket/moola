pragma solidity ^0.5.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

import "../interfaces/IPriceOracleGetter.sol";
import "../interfaces/IPriceFeed.sol";
import "../libraries/EthAddressLib.sol";
import "../libraries/EthAddressLib.sol";

/// @title CeloProxyPriceProvider
/// @author Moola
/// @notice Proxy smart contract to get the price of an asset from a price source, with Celo SortedOracles
///         smart contracts as primary option
/// - If the returned price by a SortedOracles is <= 0, the call is forwarded to a fallbackOracle
/// - Owned by the Aave governance system, allowed to add sources for assets, replace them
///   and change the fallbackOracle
contract CeloProxyPriceProvider is IPriceOracleGetter, Ownable {
    using SafeMath for uint256;

    mapping(uint256 => address) internal priceFeeds;
    mapping(uint256 => address) internal assets;
    uint256 internal priceFeedsLength;

    constructor(address[] memory _assets, address[] memory _priceFeeds) public {
        require(
            _assets.length == _priceFeeds.length,
            "the quantity does not match"
        );
        for (uint256 i = 0; i < _assets.length; i++) {
            priceFeeds[i] = _priceFeeds[i];
            assets[i] = _assets[i];
        }
        priceFeedsLength = _assets.length;
    }

    function updateAssets(address[] memory _assets, address[] memory _priceFeeds) public onlyOwner {
        require(
            _assets.length == _priceFeeds.length,
            "the quantity does not match"
        );
        for (uint256 i = 0; i < _assets.length; i++) {
            priceFeeds[i] = _priceFeeds[i];
            assets[i] = _assets[i];
        }
        priceFeedsLength = _assets.length;
    }

    /// @notice Gets an asset price by address
    /// @param _asset The asset address
    function getAssetPrice(address _asset) public view returns (uint256) {
        if (_asset == EthAddressLib.ethAddress()) {
            return 1 ether;
        }

        uint256 assetId;
        bool isExist;

        for (uint256 i = 0; i < priceFeedsLength; i++) {
            if (assets[i] == _asset) {
                assetId = i;
                isExist = true;
            }
        }

        if (isExist) {
            return (IPriceFeed(priceFeeds[assetId]).consult());
        } else {
            revert("asset not exist");
        }
    }

    /// @notice Gets a list of prices from a list of assets addresses
    /// @param _assets The list of assets addresses
    function getAssetsPrices(address[] memory _assets)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory prices = new uint256[](_assets.length);
        for (uint256 i = 0; i < _assets.length; i++) {
            prices[i] = getAssetPrice(_assets[i]);
        }

        return prices;
    }

    /// @notice Gets the address of the fallback oracle
    /// @return address The addres of the fallback oracle
    function getPriceFeed(address _asset) public view returns (address) {
        uint256 assetId;
        bool isExist;

        for (uint256 i = 0; i < priceFeedsLength; i++) {
            if (assets[i] == _asset) {
                assetId = i;
                isExist = true;
            }
        }

        if (isExist) {
            return (priceFeeds[assetId]);
        } else {
            revert("asset not exist");
        }
    }
}
