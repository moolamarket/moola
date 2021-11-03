// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

import '@openzeppelin/contracts/ownership/Ownable.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';
import './PriceFeed.sol';

contract PriceFeedFactory is Ownable {

    using FixedPoint for *;

    // this is redundant with granularity and windowSize, but stored for gas savings & informational purposes.
    uint public constant periodSize = 90; // 1.5 minutes
    uint public lastObservation;

    address[] internal _pairs;
    mapping(address => PriceFeed) public oracles;

    function pairs() external view returns (address[] memory) {
        return _pairs;
    }

    function updatePair(address pair) external onlyOwner {
        _update(pair);
    }

    function addOracle(IUniswapV2Pair pair, address tokenA, address tokenB) onlyOwner external {
        require(address(oracles[address(pair)]) == address(0), "oracle exist");
        PriceFeed oracle = new PriceFeed(pair, tokenA, tokenB);
        _pairs.push(address(pair));
        oracles[address(pair)] = oracle;
    }

    function work() external onlyOwner {
        require(_updateAll(), "UniswapV2Oracle: !work");
    }

    function _updateAll() internal returns (bool updated) {
        uint timeElapsed = block.timestamp - lastObservation;
        if (timeElapsed <= periodSize) return false;

        for (uint i = 0; i < _pairs.length; i++) {
            _update(_pairs[i]);
        }

        lastObservation = block.timestamp;
        return true;
    }

    function workable() external view returns (bool) {
        return (block.timestamp - lastObservation) > periodSize;
    }

    function _update(address pair) internal {
        PriceFeed oracle = oracles[pair];
        oracle.update();
    }
}
