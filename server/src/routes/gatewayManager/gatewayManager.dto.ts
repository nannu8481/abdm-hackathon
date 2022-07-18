import { GenericResponse, GenericFields } from '../../shared/interfaces/generic'

export interface GatewayTransactions extends GenericFields {
  initiatedBy: any
  fulfillmentType: string
  nameOrAddress: string
  transactionId: string
}

export interface Fulfillment extends GenericFields {
  transaction: any
  data: any
  active: boolean
  fulfillments: any[]
}

export interface MessageStore extends GenericFields {
  transaction: any
  senderDid: string
  receiverDid: string
  message: string
}

export interface GatewayContext {
  domain: string
  country: string
  city: string
  action: string
  timestamp: string
  core_version: string
  consumer_id: string
  consumer_uri: string
  transaction_id: string
  message_id: string
}

export interface GatewaySearchRequest {
  message: any
}

export interface GatewaySearchResponse extends GenericResponse {
  transactionId?: string
}
