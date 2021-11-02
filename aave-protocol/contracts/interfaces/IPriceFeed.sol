pragma solidity ^0.5.0;

/************
@title IPriceFeed interface
@notice Interface for the Aave price oracle.*/
interface IPriceFeed {

    // uint32 public blockTimestampLast;

    // address public immutable tokenA;
    // address public immutable tokenB;
    // address public immutable token0;
    
    //function update() public returns(uint);

    // note this will always return 0 before update has been called successfully for the first time.
    function consult() external view returns (uint);

}