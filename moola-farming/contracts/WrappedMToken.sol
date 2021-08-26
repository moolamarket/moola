// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IWrappedMToken {
    function rate() external view returns(uint);
    function deposit(uint amount) external;
    function withdraw(uint amount) external;
}

/**
 * @title Moola ERC20 MToken Wrapper
 *
 * @dev Meant to be used in liquidity pools or other contracts not aware of the interest.
 * @author Moola
 */
contract WrappedMToken is ERC20, IWrappedMToken {
    using SafeERC20 for IERC20Metadata;
    IERC20Metadata public immutable MToken;
    uint public constant MINIMUM_SUPPLY = 1000;

    constructor (IERC20Metadata _mToken, string memory _name, string memory _symbol)
    ERC20(_name, _symbol) {
        MToken = _mToken;
    }

    function mTokenBalanceOf(address _who) external view returns(uint) {
        uint currentTotalSupply = totalSupply();
        if (currentTotalSupply == 0) {
            return 0;
        }
        return (balanceOf(_who) * MToken.balanceOf(address(this))) / currentTotalSupply;
    }

    function rate() public view override returns(uint) {
        uint currentTotalSupply = totalSupply();
        if (currentTotalSupply == 0) {
            return 1e18;
        }
        return (MToken.balanceOf(address(this)) * 1e18) / currentTotalSupply;
    }

    function deposit(uint _amount) external override {
        uint mintAmount = _amount;
        uint currentBalance = MToken.balanceOf(address(this));
        uint currentTotalSupply = totalSupply();
        if (currentBalance > 0 && currentTotalSupply > 0) {
            mintAmount = (_amount * currentTotalSupply) / currentBalance;
        } else {
            require(_amount > MINIMUM_SUPPLY, 'Too small initial deposit');
            mintAmount = _amount - MINIMUM_SUPPLY;
            _mint(address(uint160(1)), MINIMUM_SUPPLY);
        }
        require(mintAmount > 0, 'Invalid deposit amount');
        MToken.safeTransferFrom(_msgSender(), address(this), _amount);
        _mint(_msgSender(), mintAmount);
    }

    function withdraw(uint _amount) external override {
        uint transferAmount = (_amount * MToken.balanceOf(address(this))) / totalSupply();
        require(transferAmount > 0, 'Invalid withdraw amount');
        MToken.safeTransfer(_msgSender(), transferAmount);
        _burn(_msgSender(), _amount);
    }
}

contract WrappedMTokenFactory {
    mapping(IERC20Metadata => IWrappedMToken) public wraps;

    event Wrapped(address wrap, address mToken);

    function wrap(IERC20Metadata _mToken) external returns (IWrappedMToken) {
        require(address(wraps[_mToken]) == address(0), 'Already wrapped');
        string memory name = string(abi.encodePacked('Wrapped ', _mToken.name()));
        string memory symbol = string(abi.encodePacked('w', _mToken.symbol()));
        IWrappedMToken wrapped = IWrappedMToken(new WrappedMToken(_mToken, name, symbol));
        wraps[_mToken] = wrapped;
        emit Wrapped(address(wrapped), address(_mToken));
        return wrapped;
    }
}
