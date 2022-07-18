import { Controller, Route, Tags, Body, Post, Security, Header } from 'tsoa'
import { UserService } from './userManager.service'
import {
  CreateUserRequest,
  CreateUserResponse,
  UpdateBloodGroupRequest,
  UpdateBloodGroupResponse,
  UpdateDonorRequest,
  UpdateDonorResponse,
} from './userManager.dto'

@Tags('UserManager')
@Route('users')
export class UserController extends Controller {
  private readonly userService = new UserService()

  @Security('accessToken')
  @Post('/')
  async createuser(
    @Header('accessToken') accessToken: string,
    @Body() params: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const data = this.userService.createUser(accessToken, { ...params })
    return data
  }

  @Security('accessToken')
  @Post('/update-blood-group')
  async updateBloodGroup(
    @Header('accessToken') accessToken: string,
    @Body() params: UpdateBloodGroupRequest,
  ): Promise<UpdateBloodGroupResponse> {
    const data = this.userService.updateBloodGroup(accessToken, { ...params })
    return data
  }

  @Security('accessToken')
  @Post('/update-donor')
  async updateDonorIntent(
    @Header('accessToken') accessToken: string,
    @Body() params: UpdateDonorRequest,
  ): Promise<UpdateDonorResponse> {
    const data = this.userService.updateDonor(accessToken, { ...params })
    return data
  }
}

export default new UserController()
