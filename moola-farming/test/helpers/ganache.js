class Ganache {
  constructor() {
    this.snapshotId = 0;
  }

  async revert() {
    await network.provider.send('evm_revert', [this.snapshotId]);
    return this.snapshot();
  }

  async snapshot() {
    this.snapshotId = await network.provider.send('evm_snapshot', []);
  }

  async mine() {
    await network.provider.send('evm_mine');
  }

  async increaseTime(timestamp) {
    await network.provider.send('evm_increaseTime', [timestamp]);
  }

  async setTime(timestamp) {
    await network.provider.send('evm_setNextBlockTimestamp', [timestamp]);
  }

  async stopMine() {
    await network.provider.send('evm_setAutomine', [false]);
  }

  async startMine() {
    await network.provider.send('evm_setAutomine', [true]);
  }
}

module.exports = Ganache;
