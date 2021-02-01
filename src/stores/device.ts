import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx'
import { deviceApi } from '../apis/device'
import { P2P_URL } from '../utils/constants'
import { Device, Page, SocketMessage } from '../models/device'
import io from 'socket.io-client'

class DeviceStore {
  currentDevice: Device | null = null
  myDevices: Device[] = []
  pages: Map<number, Page> = new Map<number, Page>()
  socket: SocketIOClient.Socket | null = null

  get devicesWithoutMe(): Device[] {
    return this.myDevices.filter((d) => d.device_id !== this.currentDevice?.device_id)
  }

  get connectedDevices() {
    return this.myDevices
  }

  get disconnectedDevices() {
    return this.devicesWithoutMe
  }

  constructor() {
    this.initCurrentDevice()
    makeAutoObservable(this)
  }

  initCurrentDevice() {
    this.currentDevice = JSON.parse(localStorage.getItem('device_info') ?? '{}')
  }

  async fetchDevices() {
    try {
      this.myDevices = await deviceApi.getDevices()
      return this.myDevices
    } catch (e) {
      console.log(e)
    }
  }

  async tryCheckDeviceConnection(deviceId: number) {
    try {
      return deviceApi.checkDeviceStatus(deviceId)
    } catch (e) {
      console.log(e)
    }
  }

  async initSignaling(id: number) {
    if (this.socket) return
    this.socket = io.connect(P2P_URL)
    this.socket.on('response', (response) => {

    })
    this.socket.on('log', (logs) => {
      console.log.apply(console, logs)
    })
    this.socket.on('message', (message: SocketMessage) => {
      const targetDeviceId = message.from
      let targetPage = this.pages.get(targetDeviceId)
      if (!targetPage) {
        targetPage = Page.getInstance(targetDeviceId)
        this.pages.set(targetDeviceId, targetPage)
      }
      Page.sendMessage(targetPage, this.socket!!, 'connect WebRTC')
    })
  }

  async tryOffSocket() {
    this.socket?.close()
    this.socket = null
  }

  async enrollDevice(label: string) {
    try {
      const res = await deviceApi.enrollDevice(label)
      localStorage.setItem('device_info', JSON.stringify(<Device>{ device_id: res.device_id, device_label: label}))
      return true
    } catch (e) {
      console.log(e)
    }
  }

  async deleteDevice(id: number) {
    try {
      await deviceApi.deleteDevice(id)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

export const deviceStore = new DeviceStore()
