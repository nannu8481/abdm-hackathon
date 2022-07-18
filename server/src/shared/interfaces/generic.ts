import mongoose from 'mongoose'

export interface GenericFields {
  _id?: mongoose.Schema.Types.ObjectId | string
  createdAt: mongoose.Date | number
  updatedAt: mongoose.Date | number
}

export interface GenericResponse {
  success?: boolean
  error?: boolean
  data?: any
  message?: string
}
