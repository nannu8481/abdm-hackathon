import { GenericFields, GenericResponse } from '../../../src/shared/interfaces/generic'

export interface User {
  name: string
}

export interface UserModel extends GenericFields {
  location?: string
  lat?: string
  long?: string
  lastReportedDate: string
  lastReportedTime: string
  phoneNumber: string
  holderDid: string
  bloodGroup?: BloodGroupVC
  relativeBloodGroup?: BloodGroupVC
  donor?: boolean
}

export interface CreateUserRequest {
  location?: string
  lat?: string
  long?: string
  phoneNumber: string
  lastReportedDate: string
  lastReportedTime: string
}

export interface CreateUserResponse extends GenericResponse {}

export interface UpdateDonorRequest {
  donor: boolean
}

export interface UpdateDonorResponse extends GenericResponse {}

export interface BloodGroupVC {
  name: string
  gender?: string
  dateOfBirth: string
  referredByDoctor?: string
  sampleCollectionDate?: string
  sampleCollectionAt?: string
  date?: string
  bloodGroup: string
  rhFactor?: string
  method?: string
  certificateIssueDate?: string
}

export interface UpdateBloodGroupRequest {
  bloodGroup: BloodGroupVC
  relativeBloodGroup?: BloodGroupVC
}

export interface UpdateBloodGroupResponse extends GenericResponse {}
