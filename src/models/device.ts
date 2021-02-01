import { PC_CONFIG } from '../utils/constants'

export interface Device {
  device_id: number
  device_label: string
}

export interface SocketMessage {
  from: number
  message: string
}

export interface Page {
  pageId: number
  isInitiator: boolean
  isStarted: boolean
  turnReady: boolean
  isPeerConnected: boolean
  peerConnection: RTCPeerConnection | null
  dataChannel?: RTCDataChannel
}

export class Page {
  public static getInstance(pageId: number): Page {
    return {
      pageId,
      isInitiator: false,
      isStarted: false,
      turnReady: false,
      isPeerConnected: false,
      peerConnection: null,
    }
  }

  public static sendData(page: Page, data: object) {
    page.dataChannel?.send(JSON.stringify(data))
  }

  public static sendMessage(page: Page, socket: SocketIOClient.Socket, message: string) {
    socket.emit('message', {
      from: page.pageId,
      to: page.pageId,
      message: message,
    })
  }

  public static tryToConnect(page: Page, socket: SocketIOClient.Socket) {
    page.isInitiator = true
    this.sendMessage(page, socket, 'connect WebRTC')
  }

  public static createPeerConnection(page: Page, socket: SocketIOClient.Socket) {
    page.peerConnection = new RTCPeerConnection(PC_CONFIG)
    page.peerConnection.onicecandidate = ({ candidate }) => {
      this.sendMessage(page, socket, JSON.stringify({
        type: 'candidate',
        label: candidate?.sdpMLineIndex,
        id: candidate?.sdpMid,
        candidate: candidate?.candidate
      }))
    }
  }

  public static handleMessage(page: Page, message: any) {
    if (message === 'connect WebRTC') {

    } else if (message.type === 'offer') {
      if (!page.isInitiator && !page.isStarted) {
        this.answer(page)
      }
      page.peerConnection?.setRemoteDescription(new RTCSessionDescription(message))
    } else if (message.type === 'answer' && page.isStarted) {
      page.peerConnection?.setRemoteDescription(new RTCSessionDescription(message))
    } else if (message.type === 'candidate' && page.isStarted) {
      page.peerConnection?.addIceCandidate(new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      }))
    } else if (message === 'bye' && page.isStarted) {

    }
  }

  public static call(page: Page) {
    page.dataChannel = page.peerConnection?.createDataChannel('Cumulus')
    page.dataChannel!.onopen = () => {

    }
    page.dataChannel!.onclose = () => {

    }
    page.dataChannel!.onmessage = () => {

    }
    page.dataChannel!.onerror = () => {

    }
  }

  public static answer(page: Page) {

  }
}
