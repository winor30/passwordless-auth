import { decrypt, encrypt, getClient, KMS, KmsKeyringBrowser } from '@aws-crypto/client-browser';


class KeyCryptor {
  private keyring: KmsKeyringBrowser
  private static instance: KeyCryptor;
  private constructor() {
    const generatorKeyId = 'arn:aws:kms:us-west-2:****:alias/***'

    const keyIds = ['arn:aws:kms:us-west-2:****:key/***']

    /* Create a KMS client provider with your AWS credentials */
    const clientProvider = getClient(KMS, { credentials: { accessKeyId: '***', secretAccessKey: '***' } })

    /* Create the KMS keyring */
    this.keyring = new KmsKeyringBrowser({ clientProvider, generatorKeyId, keyIds })
  }

  encrypt = (plainText: string) => encrypt(this.keyring, new TextEncoder().encode(plainText))

  decrypt = (ciphertext: Uint8Array) => decrypt(this.keyring, ciphertext);

  static create = () => {
    if (!KeyCryptor.instance) KeyCryptor.instance = new KeyCryptor();
    return KeyCryptor.instance;
  }
}

export default KeyCryptor;
