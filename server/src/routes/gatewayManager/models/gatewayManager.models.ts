/* eslint-disable func-names */
import mongoose from 'mongoose'
import { GatewayTransactions } from '../gatewayManager.dto'

const GatewayTransactionsSchema = new mongoose.Schema<GatewayTransactions>({
  initiatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fulfillmentType: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
})

GatewayTransactionsSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model<GatewayTransactions>('GatewayTransactions', GatewayTransactionsSchema)
