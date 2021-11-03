const Ganache = require("./helpers/ganache");
const { expect, assert, util } = require("chai");
const { BigNumber, utils, providers } = require("ethers");
const { ethers } = require("hardhat");
const deployUniswap = require("./helpers/deployUniswap");
const UniswapV2Pair = require("@uniswap/v2-core/build/UniswapV2Pair.json");

describe("CeloProxyPriceProvider", function () {
    const ganache = new Ganache();

    let owner;
    let user;
    let liquidityDistributor;

    let token1;
    let token2;

    let uniswapFactory;
    let uniswapRouter;
    let uniswapPair;

    let celoProxyPriceProvider;
    let priceFeed;

    before("setup", async () => {
        let accounts = await ethers.getSigners();

        owner = accounts[0];
        user = accounts[1];
        liquidityDistributor = accounts[3];

        const Token = await ethers.getContractFactory("MintableERC20");

        token1 = await Token.deploy();
        await token1.deployed();

        await token1.mint(
            liquidityDistributor.address,
            utils.parseUnits("100000", "ether")
        );
        await token1.mint(user.address, utils.parseUnits("1000", "ether"));

        token2 = await Token.deploy();
        await token2.deployed();

        await token2.mint(
            liquidityDistributor.address,
            utils.parseUnits("100000", "ether")
        );
        await token2.mint(user.address, utils.parseUnits("1000", "ether"));

        const contracts = await deployUniswap(accounts);
        uniswapFactory = contracts.uniswapFactory;
        uniswapRouter = contracts.uniswapRouter;

        await token1
            .connect(liquidityDistributor)
            .approve(
                uniswapRouter.address,
                utils.parseUnits("100000", "ether")
            );
        await token2
            .connect(liquidityDistributor)
            .approve(
                uniswapRouter.address,
                utils.parseUnits("100000", "ether")
            );

        await uniswapRouter
            .connect(liquidityDistributor)
            .addLiquidity(
                token1.address,
                token2.address,
                utils.parseUnits("100000", "ether"),
                utils.parseUnits("100000", "ether"),
                0,
                0,
                liquidityDistributor.address,
                2000000000
            );

        const pairAddress = await uniswapFactory.getPair(
            token1.address,
            token2.address
        );

        uniswapPair = await ethers.getContractAt(
            UniswapV2Pair.abi,
            pairAddress
        );

        const PriceFeedFactory = await ethers.getContractFactory(
            "PriceFeedFactory"
        );

        oracleFactory = await PriceFeedFactory.deploy();
        await oracleFactory.deployed();

        await oracleFactory.addOracle(
            pairAddress,
            token1.address,
            token2.address
        );

        const priceFeedAddress = await oracleFactory.oracles(pairAddress);

        const PriceFeed = await ethers.getContractFactory("PriceFeed");

        priceFeed = new ethers.Contract(
            priceFeedAddress,
            PriceFeed.interface,
            owner
        );

        const CeloProxyPriceProvider = await ethers.getContractFactory("CeloProxyPriceProvider");
        celoProxyPriceProvider = await CeloProxyPriceProvider.deploy({0x1 : priceFeed.address});
        await celoProxyPriceProvider.deployed();

        await ganache.snapshot();
    });

    afterEach("revert", function () {
        return ganache.revert();
    });

    it("should check", async () => {
        console.log("check");
    });
});
