pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

import "../libraries/EthAddressLib.sol";


/// @title SimpleTokenDistributor
/// @author Moola
/// @notice Receives tokens and manages the distribution amongst receivers
///  The usage is as follows:
///  - The distribution addresses and percentages are set up on construction
///  - At any moment, anyone can call distribute() with a list of token addresses in order to distribute
///    the accumulated token amounts and/or ETH in this contract to all the receivers with percentages
contract SimpleTokenDistributor {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    struct Share {
        address receiver;
        uint16 percent;
    }

    event DistributionUpdated(Share[] shares);
    event Distributed(address receiver, uint256 percentage, uint256 amount);

    /// @notice Defines how tokens and ETH are distributed on each call to .distribute()
    Share[] private shares;

    /// @notice Instead of using 100 for percentages, higher base to have more precision in the distribution
    uint256 public constant DISTRIBUTION_BASE = 10000;

    /// @notice Called by the proxy when setting this contract as implementation
    constructor(Share[] memory _shares) public {
        internalSetTokenDistribution(_shares);
    }

    /// @notice In order to receive ETH transfers
    function() external payable {}

    /// @notice Distributes a list of _tokens balances in this contract, depending on the distribution
    /// @param _tokens list of ERC20 tokens to distribute
    function distribute(IERC20[] memory _tokens) public {
        for (uint256 i = 0; i < _tokens.length; i++) {
            address _tokenAddress = address(_tokens[i]);
            uint256 _balanceToDistribute = (_tokenAddress != EthAddressLib.ethAddress())
                ? _tokens[i].balanceOf(address(this))
                : address(this).balance;
            if (_balanceToDistribute == 0) {
                continue;
            }

            Share[] memory _shares = shares;
            for (uint256 j = 0; j < _shares.length; j++) {
                uint256 _amount = _balanceToDistribute.mul(_shares[j].percent).div(DISTRIBUTION_BASE);
                if (_tokenAddress != EthAddressLib.ethAddress()) {
                    _tokens[i].safeTransfer(_shares[j].receiver, _amount);
                } else {
                    (bool _success,) = _shares[j].receiver.call.value(_amount)("");
                    require(_success, "Reverted ETH transfer");
                }
                emit Distributed(_shares[j].receiver, _shares[j].percent, _amount);
            }
        }
    }

    /// @notice Returns the receivers and percentages of the contract Distribution
    /// @return shares array of addresses and percentages
    function getDistribution() public view returns(Share[] memory) {
        return shares;
    }

    /// @notice Sets receivers addresses with percentages for each one
    /// @param newShares Array of addresses receiving a percentage of the distribution, both user addresses
    ///   or contracts, and percent to receive.
    function internalSetTokenDistribution(Share[] memory newShares) internal {
        uint totalPercent = 0;
        shares.length = newShares.length;
        for (uint i = 0; i < newShares.length; i++) {
            require(newShares[i].receiver != address(0), "Invalid receiver");
            totalPercent = totalPercent.add(newShares[i].percent);
            shares[i] = newShares[i];
        }
        require(totalPercent == DISTRIBUTION_BASE, "Invalid total percent");

        emit DistributionUpdated(newShares);
    }
}
