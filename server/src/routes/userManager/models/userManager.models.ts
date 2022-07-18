/* eslint-disable func-names */
import mongoose from 'mongoose'
import { UserModel } from '../userManager.dto'

const UserSchema = new mongoose.Schema<UserModel>({
  location: { type: String, required: false },
  lat: { type: String, required: false },
  long: { type: String, required: false },
  lastReportedDate: { type: String, required: true },
  lastReportedTime: { type: String, required: true },
  holderDid: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  donor: { type: Boolean, required: false, default: false },
  bloodGroup: { type: mongoose.Schema.Types.Mixed, required: false },
  relativeBloodGroup: { type: mongoose.Schema.Types.Mixed, required: false },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
})

UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model<UserModel>('User', UserSchema)
