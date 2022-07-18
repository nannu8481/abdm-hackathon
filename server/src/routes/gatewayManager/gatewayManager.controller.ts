import { Controller, Route, Tags, Body, Post, Security, Header, Hidden } from 'tsoa'
import { GatewayService } from './gatewayManager.service'
import { GatewaySearchRequest, GatewaySearchResponse } from './gatewayManager.dto'
import { logger } from '../../shared/logger'

@Tags('GatewayManager')
@Route('')
export class GatewayController extends Controller {
  private readonly gatewayService = new GatewayService()

  @Hidden()
  @Post('/on_search')
  async onSearch(@Body() params: any): Promise<any> {
    logger.info(JSON.stringify(params))
    const data = this.gatewayService.onSearch({ ...params })
    return data
  }

  @Security('accessToken')
  @Post('/get_requests')
  async getRequests(
    @Header('accessToken') accessToken: string,
    @Body() params: { transactionId: string },
  ): Promise<any> {
    logger.info(JSON.stringify(params))
    const data = this.gatewayService.getRequests(accessToken, { ...params })
    return data
  }

  @Security('accessToken')
  @Post('/view_requests')
  async viewRequests(@Header('accessToken') accessToken: string): Promise<any> {
    const data = this.gatewayService.viewRequests(accessToken)
    return data
  }

  @Security('accessToken')
  @Post('/search')
  async search(
    @Header('accessToken') accessToken: string,
    @Body() params: GatewaySearchRequest,
  ): Promise<GatewaySearchResponse> {
    const data = this.gatewayService.search(accessToken, { ...params })
    return data
  }
}

export default new GatewayController()
