const Ganache = require('./helpers/ganache');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('WrappedMToken', () => {
  const ganache = new Ganache();

  let accounts;
  let owner, ownerSigner;
  let user, userSigner;
  let user2, user2Signer;

  let factory;
  let token;
  let wrappedToken;

  const WAD = 10n ** 18n;

  before('setup', async () => {
    [ownerSigner, userSigner, user2Signer] = await ethers.getSigners();

    owner = ownerSigner.address;
    user = userSigner.address;
    user2 = user2Signer.address;

    const Factory = await ethers.getContractFactory('WrappedMTokenFactory');

    factory = await Factory.deploy();
    await factory.deployed();

    const Token = await ethers.getContractFactory('Token');

    token = await Token.deploy();
    await token.deployed();
    await token.mint(user, 101000);
    await token.mint(user2, 200000);
    await token.mint(owner, 300000);

    await factory.wrap(token.address);
    wrappedToken = await ethers.getContractAt('WrappedMToken', await factory.wraps(token.address));
    await token.connect(userSigner).approve(wrappedToken.address, WAD);
    await token.connect(user2Signer).approve(wrappedToken.address, WAD);
    await token.connect(ownerSigner).approve(wrappedToken.address, WAD);

    await ganache.snapshot();
  });

  afterEach('cleanup', async () => {
    await ganache.revert();
  });

  it('should have valid metadata', async () => {
    expect(await wrappedToken.name()).to.equal('Wrapped Testooo');
    expect(await wrappedToken.symbol()).to.equal('wTSTOO');
    expect(await wrappedToken.totalSupply()).to.equal(0);
    expect(await wrappedToken.rate()).to.equal(WAD);
    expect(await wrappedToken.balanceOf(user)).to.equal(0);
    expect(await wrappedToken.mTokenBalanceOf(user)).to.equal(0);
  });

  it('should deposit and withdraw correctly', async () => {
    await expect(wrappedToken.connect(userSigner).deposit(1000))
    .to.be.revertedWith('Too small initial deposit');
    await wrappedToken.connect(userSigner).deposit(2000);
    expect(await wrappedToken.totalSupply()).to.equal(2000);
    expect(await wrappedToken.rate()).to.equal(WAD);
    expect(await wrappedToken.balanceOf(user)).to.equal(1000);
    expect(await token.balanceOf(user)).to.equal(99000);
    expect(await wrappedToken.mTokenBalanceOf(user)).to.equal(1000);

    await wrappedToken.connect(userSigner).withdraw(1000);
    expect(await wrappedToken.totalSupply()).to.equal(1000);
    expect(await wrappedToken.rate()).to.equal(WAD);
    expect(await wrappedToken.balanceOf(user)).to.equal(0);
    expect(await token.balanceOf(user)).to.equal(100000);
    expect(await wrappedToken.mTokenBalanceOf(user)).to.equal(0);

    await wrappedToken.connect(userSigner).deposit(1000);
    expect(await wrappedToken.totalSupply()).to.equal(2000);
    expect(await wrappedToken.rate()).to.equal(WAD);
    expect(await wrappedToken.balanceOf(user)).to.equal(1000);
    expect(await token.balanceOf(user)).to.equal(99000);
    expect(await wrappedToken.mTokenBalanceOf(user)).to.equal(1000);

    await wrappedToken.connect(userSigner).deposit(2000);
    expect(await wrappedToken.totalSupply()).to.equal(4000);
    expect(await wrappedToken.rate()).to.equal(WAD);
    expect(await wrappedToken.balanceOf(user)).to.equal(3000);
    expect(await token.balanceOf(user)).to.equal(97000);
    expect(await wrappedToken.mTokenBalanceOf(user)).to.equal(3000);

    await wrappedToken.connect(user2Signer).deposit(6000);
    expect(await wrappedToken.totalSupply()).to.equal(10000);
    expect(await wrappedToken.rate()).to.equal(WAD);
    expect(await wrappedToken.balanceOf(user2)).to.equal(6000);
    expect(await token.balanceOf(user2)).to.equal(194000);
    expect(await wrappedToken.mTokenBalanceOf(user2)).to.equal(6000);

    await token.mint(wrappedToken.address, 2000);
    expect(await wrappedToken.totalSupply()).to.equal(10000);
    expect(await wrappedToken.rate()).to.equal((WAD * 12n) / 10n);
    expect(await wrappedToken.balanceOf(user)).to.equal(3000);
    expect(await token.balanceOf(user)).to.equal(97000);
    expect(await wrappedToken.mTokenBalanceOf(user)).to.equal(3600);
    expect(await wrappedToken.balanceOf(user2)).to.equal(6000);
    expect(await token.balanceOf(user2)).to.equal(194000);
    expect(await wrappedToken.mTokenBalanceOf(user2)).to.equal(7200);

    await token.mint(wrappedToken.address, 8000);
    expect(await wrappedToken.totalSupply()).to.equal(10000);
    expect(await wrappedToken.rate()).to.equal(WAD * 2n);
    expect(await wrappedToken.balanceOf(user)).to.equal(3000);
    expect(await token.balanceOf(user)).to.equal(97000);
    expect(await wrappedToken.mTokenBalanceOf(user)).to.equal(6000);
    expect(await wrappedToken.balanceOf(user2)).to.equal(6000);
    expect(await token.balanceOf(user2)).to.equal(194000);
    expect(await wrappedToken.mTokenBalanceOf(user2)).to.equal(12000);

    await wrappedToken.connect(userSigner).deposit(4000);
    expect(await wrappedToken.totalSupply()).to.equal(12000);
    expect(await wrappedToken.rate()).to.equal(WAD * 2n);
    expect(await wrappedToken.balanceOf(user)).to.equal(5000);
    expect(await token.balanceOf(user)).to.equal(93000);
    expect(await wrappedToken.mTokenBalanceOf(user)).to.equal(10000);

    await token.mint(wrappedToken.address, 12000);
    expect(await wrappedToken.totalSupply()).to.equal(12000);
    expect(await wrappedToken.rate()).to.equal(WAD * 3n);
    expect(await wrappedToken.balanceOf(user)).to.equal(5000);
    expect(await token.balanceOf(user)).to.equal(93000);
    expect(await wrappedToken.mTokenBalanceOf(user)).to.equal(15000);
    expect(await wrappedToken.balanceOf(user2)).to.equal(6000);
    expect(await token.balanceOf(user2)).to.equal(194000);
    expect(await wrappedToken.mTokenBalanceOf(user2)).to.equal(18000);

    await wrappedToken.connect(user2Signer).deposit(6000);
    expect(await wrappedToken.totalSupply()).to.equal(14000);
    expect(await wrappedToken.rate()).to.equal(WAD * 3n);
    expect(await wrappedToken.balanceOf(user2)).to.equal(8000);
    expect(await token.balanceOf(user2)).to.equal(188000);
    expect(await wrappedToken.mTokenBalanceOf(user2)).to.equal(24000);

    await wrappedToken.connect(ownerSigner).deposit(9000);
    expect(await wrappedToken.totalSupply()).to.equal(17000);
    expect(await wrappedToken.rate()).to.equal(WAD * 3n);
    expect(await wrappedToken.balanceOf(owner)).to.equal(3000);
    expect(await token.balanceOf(owner)).to.equal(291000);
    expect(await wrappedToken.mTokenBalanceOf(owner)).to.equal(9000);

    await wrappedToken.connect(ownerSigner).withdraw(1000);
    expect(await wrappedToken.totalSupply()).to.equal(16000);
    expect(await wrappedToken.rate()).to.equal(WAD * 3n);
    expect(await wrappedToken.balanceOf(owner)).to.equal(2000);
    expect(await token.balanceOf(owner)).to.equal(294000);
    expect(await wrappedToken.mTokenBalanceOf(owner)).to.equal(6000);

    await wrappedToken.connect(ownerSigner).withdraw(2000);
    expect(await wrappedToken.totalSupply()).to.equal(14000);
    expect(await wrappedToken.rate()).to.equal(WAD * 3n);
    expect(await wrappedToken.balanceOf(owner)).to.equal(0);
    expect(await token.balanceOf(owner)).to.equal(300000);
    expect(await wrappedToken.mTokenBalanceOf(owner)).to.equal(0);
  });
});
