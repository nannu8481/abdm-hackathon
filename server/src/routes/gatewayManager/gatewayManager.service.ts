import axios from 'axios'
import GatewayTransaction from './models/gatewayManager.models'
import sdkService from '../../utils/affinidiSdk'
import { v4 as uuidv4 } from 'uuid'
import mongoose from 'mongoose'
import { GatewaySearchRequest, GatewaySearchResponse, GatewayContext } from './gatewayManager.dto'
import User from '../userManager/models/userManager.models'
import Fulfillment from './models/fulfillment.models'
import Message from './models/message.models'

const ObjectId = mongoose.Types.ObjectId

export class GatewayService {
  async getRequests(accessToken: string, params: { transactionId: string }): Promise<any> {
    const { transactionId } = params

    try {
      const wallet = await sdkService.createWalletInstanceUsingAccessToken(accessToken)
      const did = wallet?.did

      const messages = await Message.find({ receiverDid: did }).populate({
        path: 'transaction',
        match: { transactionId },
      })
      const decryptedMessages = messages.map(async (msg) => {
        const decryptedMsg = wallet.readEncryptedMessage(msg.message)
        return decryptedMsg
      })

      const allMessages = await Promise.all(decryptedMessages)

      const transaction = await GatewayTransaction.findOne({ transactionId })

      const fulfillment = await Fulfillment.find({
        transaction,
      })

      const allFulfillment = fulfillment.map((item) => item.fulfillments)

      return { success: true, data: allFulfillment, messages: allMessages }
    } catch (err: any) {
      const errMessage = err?.data?.response?.message || err?.message || 'Something went wrong'
      return { error: true, message: errMessage }
    }
  }

  async viewRequests(accessToken: string): Promise<any> {
    console.log(accessToken)

    try {
      const wallet = await sdkService.createWalletInstanceUsingAccessToken(accessToken)
      const did = wallet?.did

      console.log('DID is', did)

      const user = await User.findOne({ holderDid: did })
      if (!user?.donor) throw new Error('User is not a donor')
      if (!user) throw new Error('User not found')

      const transactions = await GatewayTransaction.find({}).populate({
        path: 'initiatedBy',
        match: { location: user.location },
      })

      const allMessages = transactions.map(async (item) => {
        const encryptedMessage = await wallet.createEncryptedMessage(item.initiatedBy.holderDid, {
          name: user.bloodGroup?.name,
          phoneNumber: user.phoneNumber,
          bloodGroup: user?.bloodGroup,
        })

        const messageInstance = Message.findOneAndUpdate(
          {
            transaction: new ObjectId(item._id),
            senderDid: did,
          },
          {
            transaction: new ObjectId(item._id),
            senderDid: did,
            receiverDid: item.initiatedBy.holderDid,
            message: encryptedMessage,
          },
          { upsert: true },
        )
        return messageInstance
      })
      await Promise.all(allMessages)

      return { success: true }
    } catch (err: any) {
      const errMessage = err?.data?.response?.message || err?.message || 'Something went wrong'
      return { error: true, message: errMessage }
    }
  }

  async onSearch(params: any): Promise<any> {
    const { message, context } = params

    console.log(params)

    const fulfillments = message?.catalog?.fulfillments || []

    if (!fulfillments.length) return

    const fullfillmentsData = fulfillments

    console.log('Fulfillment here', fullfillmentsData)

    // if (fulfillments && fulfillments.length) {
    //   fullfillmentsData = fulfillments.map((item: any) => {
    //     return {
    //       ...item,
    //       tags: {
    //         first_consultation: item?.tags?.['@abdm/gov/in/first_consultation'],
    //         follow_up: item?.tags?.['@abdm/gov/in/follow_up'],
    //         experience: item?.tags?.['@abdm/gov/in/experience'],
    //         languages: item?.tags?.['@abdm/gov/in/languages'],
    //         speciality: item?.tags?.['@abdm/gov/in/speciality'],
    //         lab_report_consultation: item?.tags?.['@abdm/gov/in/lab_report_consultation'],
    //         education: item?.tags?.['@abdm/gov/in/education'],
    //         hpr_id: item?.tags?.['@abdm/gov/in/hpr_id'],
    //         signature: item?.tags?.['@abdm/gov/in/signature'],
    //       },
    //     }
    //   })
    // }

    try {
      const transaction = await GatewayTransaction.findOne({ _id: context?.transaction_id }).populate({
        path: 'initiatedBy',
      })
      console.log('Transaction here', transaction)

      if (!transaction) throw new Error('Transaction not found')

      const fulfillment = new Fulfillment({
        transaction: new ObjectId(transaction._id),
        fulfillments: fullfillmentsData,
        data: params,
      })
      await fulfillment.save()
    } catch (err: any) {
      const errMessage = err?.data?.response?.message || err?.message || 'Something went wrong'
      return { error: true, message: errMessage }
    }
  }

  async search(accessToken: string, params: GatewaySearchRequest): Promise<GatewaySearchResponse> {
    const { message } = params

    const context: GatewayContext = {
      domain: 'nic2004:85111',
      country: 'IND',
      city: 'std:080',
      action: 'search',
      timestamp: '2022-07-14T08:05:55.252760Z',
      core_version: '0.7.1',
      consumer_id: 'affinidi-uhieua',
      consumer_uri: 'http://d2yxido15wkpn5.cloudfront.net',
      transaction_id: 'c8f9ad70-034b-11ed-a6d6-c13d491ee158',
      message_id: 'c8f9ad70-034b-11ed-a6d6-c13d491ee158',
    }
    const searchUrl = process.env.EUA_GATEWAY_URL || ''
    console.log(searchUrl)
    try {
      const wallet = await sdkService.createWalletInstanceUsingAccessToken(accessToken)
      const did = wallet?.did

      const user = await User.findOne({ where: { holderDid: did } })

      if (user) {
        if (!user?.bloodGroup?.name) throw new Error('Please add blood group')
        const transId = uuidv4()

        const gatewayTransaction = new GatewayTransaction({
          fulfillmentType: message?.intent?.fulfillment?.type || '',
          initiatedBy: user,
          transactionId: transId,
        })

        await gatewayTransaction.save()

        context.transaction_id = gatewayTransaction._id as string
        context.message_id = transId
        context.timestamp = new Date().toISOString()

        const response = await axios.post(`${searchUrl}/search`, { context, message })
        return { success: true, data: response?.data, transactionId: transId }
      } else throw new Error('User not found')
    } catch (err: any) {
      const errMessage = err?.data?.response?.message || err?.message || 'Something went wrong'
      return { error: true, message: errMessage }
    }
  }
}
