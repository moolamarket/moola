// SPDX-License-Identifier: MIT

// Interface adapted from AAVE.

pragma solidity ^0.8.3;

interface ILendingPool {
    function deposit(
        address _reserve,
        uint256 _amount,
        uint16 _referralCode
    ) external payable;
}
