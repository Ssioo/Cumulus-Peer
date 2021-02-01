import { makeAutoObservable } from 'mobx'
import { userApi } from '../apis/user'
import { Credential } from '../models/auth'

class UserStore {
  token: Credential | null = null

  constructor() {
    makeAutoObservable(this)
    this.initToken()
  }

  initToken() {
    this.token = JSON.parse(localStorage.getItem('credentials') ?? '{}')
  }

  async verifyAuth() {
    try {
      await userApi.verifyAuth()
      return true
    } catch (e) {
      this.token = null
      console.log(e)
    }
  }

  async trySignIn(name: string, pwd: string) {
    try {
      const res = await userApi.signIn(name, pwd)
      if (res.access_token && res.user_id) {
        const cred: Credential = {
          access_token: res.access_token,
          user_id: res.user_id,
          username: name,
        }
        this.token = cred
        return true
      }
    } catch (e) {
      console.log(e)
    }
  }

  async trySignUp(name: string, email: string, pwd: string, pwdConfirm: string) {
    try {
      const res = await userApi.signUp(name, email, pwd, pwdConfirm)
      return res
    } catch (e) {
      console.log(e)
    }
  }

  logOut() {
    this.token = null
    localStorage.removeItem('credentials')
  }
}

export const userStore = new UserStore()
