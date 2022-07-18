import mongoose from 'mongoose'
import { Fulfillment } from '../gatewayManager.dto'

const FulfillmentRequestsSchema = new mongoose.Schema<Fulfillment>({
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GatewayTransactions',
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  fulfillments: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
})

FulfillmentRequestsSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model<Fulfillment>('FulfillmentRequests', FulfillmentRequestsSchema)
