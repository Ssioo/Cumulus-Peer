import { BaseApi } from './base'
import { ApiError } from './error'
import { Device } from '../models/device'

class DeviceApi extends BaseApi {
  async enrollDevice(label: string): Promise<{ device_id: number }> {
    const res = await this.post('/user/register-device', { label })
    if (!res.success) throw new ApiError(res)
    return { device_id: res.device_id }
  }

  async getDevices(): Promise<Device[]> {
    const res = await this.get('/user/get-device-list')
    if (!res.success) throw new ApiError(res)
    return res.device_list
  }

  async verifyDevice(id: number) {
    const res = await this.get(`/user/check-device-id?id=${id}`)
    return res.valid
  }

  async checkDeviceStatus(id: number): Promise<{ pageId: number, isOnline: boolean }> {
    const res = await this.get(`/is_online/${id}`, true, true)
    return res
  }

  async deleteDevice(id: number) {
    const res = await this.get(`/delete-device?id=${id}`)
    return res.isRemoved
  }
}

export const deviceApi = new DeviceApi()
