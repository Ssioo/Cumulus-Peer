import React, { useEffect } from 'react'
import './css/popup.css'
import { deviceStore } from '../stores/device'
import { Device } from '../models/device'
import { observer } from 'mobx-react-lite'
import { userStore } from '../stores/user'
import { useHistory } from 'react-router-dom'

const DevicesScreen = observer(() => {
  const history = useHistory()

  useEffect(() => {
    deviceStore.fetchDevices().then((devices) => {
      if (devices?.length === 0) history.push('/pwa/enroll_devices')
      console.log(devices)
    })
    deviceStore.initCurrentDevice()
  }, [])

  return (
    <div className="login-page">
      <div className="form">
        <h2>
          <b>Hello, <span id="span-username">{userStore.token?.username}</span>!</b>
        </h2>
        <p className="list-title">Your current device</p>
        <p className="list-message">* Click or touch if you'd like to disconnect from others.</p>
        <ul id="ul-current-device">
          <li id="li-current-device">{deviceStore.currentDevice?.device_label}</li>
        </ul>
        <ConnectedDevices/>
        <DisConnectedDevices/>
        <p id="message-from-server" style={{ color: 'red' }}/>
        <p className="message">
          Would you like to <a
          style={{ cursor: 'pointer' }}
          onClick={async () => {
            await deviceStore.fetchDevices()
            deviceStore.initCurrentDevice()
          }}
        >
          Reload?
        </a>
        </p>
        <p className="message">Would you like to <a
          style={{ cursor: 'pointer' }}
          onClick={() => {
            userStore.logOut()
            history.replace('/pwa')
          }}>
          Sign out?
        </a>
        </p>
      </div>
    </div>
  )
})

const ConnectedDevices = observer(() => {
  const history = useHistory()

  return (
    <>
      <p className="list-title">Your connected device(s)</p>
      <p className="list-message">* Click or touch one if you'd like to disconnect specific device.</p>
      <ul id="ul-connected-devices">
        {deviceStore.myDevices.map((d) =>
          <DeviceItem
            device={d}
            isConnected
            key={d.device_id.toString()}
            onPressConnectedItem={() => history.push('/pwa/advanced_options')}
          />
        )}
      </ul>
    </>
  )
})

const DeviceItem: React.FC<{
  device: Device,
  isConnected: boolean,
  onPressConnectedItem?: () => void
}> = ({ device, isConnected, onPressConnectedItem }) => {
  return (
    <li
      id={`background-${device.device_id}`}
      onClick={async () => {
        if (isConnected) {
          onPressConnectedItem && onPressConnectedItem()
        } else {
          const res = await deviceStore.tryCheckDeviceConnection(device.device_id)
          if (res?.isOnline) {
            await deviceStore.initSignaling(device.device_id)
          } else {

          }
        }
      }}
    >
      {device.device_label}
    </li>
  )
}

const DisConnectedDevices = () => {
  return (
    <>
      <p className="list-title">Your disconnected device(s)</p>
      <p className="list-message">* Click or touch one if you'd like to connect specific device.</p>
      <ul id="ul-disconnected-devices">
        {deviceStore.disconnectedDevices.map((d) =>
          <DeviceItem device={d} isConnected={false} key={d.device_id.toString()}/>
        )}
      </ul>
    </>
  )
}

export default DevicesScreen
