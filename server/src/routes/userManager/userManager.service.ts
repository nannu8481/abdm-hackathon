import {
  CreateUserRequest,
  CreateUserResponse,
  UpdateBloodGroupRequest,
  UpdateBloodGroupResponse,
  UpdateDonorRequest,
  UpdateDonorResponse,
} from './userManager.dto'
import sdkService from '../../utils/affinidiSdk'
import User from './models/userManager.models'

export class UserService {
  async createUser(accessToken: string, params: CreateUserRequest): Promise<CreateUserResponse> {
    console.log(params)
    try {
      const wallet = await sdkService.createWalletInstanceUsingAccessToken(accessToken)
      const userData = { ...params, holderDid: wallet?.did || '' }

      let user

      const ifUser = await User.findOne({ holderDid: wallet?.did })

      if (ifUser && ifUser?.holderDid) {
        user = ifUser
      } else {
        const userInstance = new User(userData)
        user = await userInstance.save()
      }

      return { success: true, data: user }
    } catch (err: any) {
      return { error: true, message: err?.message || 'Something went wrong' }
    }
  }

  async updateDonor(accessToken: string, params: UpdateDonorRequest): Promise<UpdateDonorResponse> {
    console.log(params)
    try {
      const { donor } = params
      const wallet = await sdkService.createWalletInstanceUsingAccessToken(accessToken)
      const did = wallet?.did

      const user = await User.findOne({ holderDid: did })
      if (user) {
        user.donor = donor
        await user.save()
        return { success: true, data: user }
      }
      throw new Error('User not found')
    } catch (err: any) {
      return { error: true, message: err?.message || 'Something went wrong' }
    }
  }

  async updateBloodGroup(accessToken: string, params: UpdateBloodGroupRequest): Promise<UpdateBloodGroupResponse> {
    try {
      const { bloodGroup, relativeBloodGroup } = params
      const wallet = await sdkService.createWalletInstanceUsingAccessToken(accessToken)
      const did = wallet?.did

      const user = await User.findOne({ where: { holderDid: did } })
      if (user) {
        if (bloodGroup?.name) user.bloodGroup = bloodGroup
        if (relativeBloodGroup && relativeBloodGroup?.name) user.relativeBloodGroup = relativeBloodGroup
        await user.save()
        return { success: true, data: user }
      }
      throw new Error('User not found')
    } catch (err: any) {
      return { error: true, message: err?.message || 'Something went wrong' }
    }
  }
}
