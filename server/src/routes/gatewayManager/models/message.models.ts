import mongoose from 'mongoose'
import { MessageStore } from '../gatewayManager.dto'

const MessagesSchema = new mongoose.Schema<MessageStore>({
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GatewayTransactions',
    required: true,
  },
  senderDid: {
    type: String,
    required: false,
  },
  receiverDid: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
})

MessagesSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model<MessageStore>('Messages', MessagesSchema)
