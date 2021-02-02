import { BASE_URL, P2P_URL } from '../infra/constants'

export class BaseApi {

  cred: string | null = null

  get commonHeaders() {
    if (!this.cred)
      this.cred = JSON.parse(localStorage.getItem('credentials') ?? '{}').access_token
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: this.cred || ''
    }
  }

  get noAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }

  async get(path: string, withAuth = true, isP2P?: boolean) {
    const res = await fetch(`${isP2P ? P2P_URL : BASE_URL}${path}`, {
      method: 'GET',
      headers: withAuth ? this.commonHeaders : this.noAuthHeaders
    })
    return await res.json()
  }

  async post(path: string, body?: object, withAuth = true, isP2P?: boolean) {
    const res = await fetch(`${isP2P ? P2P_URL : BASE_URL}${path}`, {
      method: 'POST',
      headers: withAuth ? this.commonHeaders : this.noAuthHeaders,
      body: JSON.stringify(body)
    })
    return await res.json()
  }

}
