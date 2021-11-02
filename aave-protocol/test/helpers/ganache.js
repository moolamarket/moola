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

  async setTime(timestamp) {
    await network.provider.send('evm_mine', [timestamp]);
  }

  async increaseTime(timestamp) {
    await network.provider.send('evm_increaseTime', [timestamp]);
  }
}

module.exports = Ganache;
