import * as ethers from 'ethers';

class KeyCreator {
  private wallet: ethers.Wallet
  private static instance: KeyCreator;
  private constructor() {
    this.wallet = ethers.Wallet.createRandom();
  }

  get privateKey() {
    return this.wallet.privateKey;
  }

  get address() {
    return this.wallet.address;
  }

  static create = () => {
    if (!KeyCreator.instance) KeyCreator.instance = new KeyCreator();
    return KeyCreator.instance
  }
}

export default KeyCreator;
