import { BaseApi } from './base'
import { BASE_URL } from '../utils/constants'
import { ApiError } from './error'

class UserApi extends BaseApi {
  async verifyAuth() {
    const res = await fetch(`${BASE_URL}/user/ping-auth`, {
      method: 'GET',
      headers: this.commonHeaders
    })
    const txt = await res.text()
    if (txt.length === 0) throw new ApiError(res)
    return txt
  }

  async signIn(username: string, password: string): Promise<{ access_token?: string, user_id?: number }> {
    const res = await this.post('/user/sign-in', {
      username,
      password,
    }, false)
    return { access_token: res.access_token, user_id: res.user_id }
  }

  async signUp(username: string, email: string, pwd: string, pwdConfirm: string): Promise<{ success: boolean, message: string }> {
    const res = await this.post('/user/sign-up', {
      username,
      email,
      password: pwd,
      'password-confirm': pwdConfirm,
    }, false)
    return { success: res.success, message: res.msg }
  }
}

export const userApi = new UserApi()
