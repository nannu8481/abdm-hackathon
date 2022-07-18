/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWallet, EventComponent } from '@affinidi/wallet-node-sdk'
import { SdkOptions, Env } from '@affinidi/wallet-core-sdk'
import { NetworkMemberWithCognito } from '@affinidi/wallet-core-sdk/dist/CommonNetworkMember/NetworkMemberWithCognito'

class AffinidiSdk {
  private readonly options: SdkOptions

  constructor(options: SdkOptions) {
    this.options = options
  }

  async createWalletInstanceUsingAccessToken(accessToken: string) {
    const serializedSession = JSON.stringify({ accessToken })
    const wallet = await createWallet(EventComponent.AffinidiCloudAPI).deserializeSession(
      this.options,
      serializedSession,
    )

    return wallet
  }

  async encryptMessage(wallet: NetworkMemberWithCognito, toDid: string, message: any) {
    const encryptedMessage = await wallet.createEncryptedMessage(toDid, message)
    return encryptedMessage
  }
}

export default new AffinidiSdk({
  accessApiKey: process.env.CLOUD_WALLET_API_KEY,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  env: process.env.CLOUD_WALLET_ENV as Env,
})
