const UniswapV2Factory = require("@uniswap/v2-core/build/UniswapV2Factory.json");
const UniswapV2Router02 =  require("@uniswap/v2-periphery/build/UniswapV2Router02.json");
const WETH = require("@uniswap/v2-periphery/build/WETH9.json");

async function deployUniswap(accounts) {
  const owner = accounts[0];


  const WethFactory = new ethers.ContractFactory(WETH.abi, WETH.bytecode, owner);
  const weth = await WethFactory.deploy();

  const UniswapFactory = new ethers.ContractFactory(UniswapV2Factory.abi, UniswapV2Factory.bytecode, owner);
  const uniswapFactory = await UniswapFactory.deploy(owner.address);

  const UniswapV2Router02Factory = new ethers.ContractFactory(
    UniswapV2Router02.abi,
    UniswapV2Router02.bytecode,
    owner
  );
  const uniswapRouter = await UniswapV2Router02Factory.deploy(uniswapFactory.address, weth.address);

  return { uniswapFactory, weth, uniswapRouter };
}

module.exports = deployUniswap;