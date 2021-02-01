import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { userStore } from '../stores/user'
import { deviceStore } from '../stores/device'
import { useHistory } from 'react-router-dom'
import { Device } from '../models/device'

const DeviceDetailScreen = observer(() => {
  const history = useHistory()
  const [msg, setMsg] = useState('')

  useEffect(() => {
    deviceStore.fetchDevices()
    deviceStore.initCurrentDevice()
  }, [])

  return (
    <div className="login-page">
      <div className="form">
        <h2><b>Hello, <span id="span-username">{userStore.token?.username}</span>!</b></h2>
        <p className="list-title">Change this device's label</p>
        <p className="list-message">* Current label: <span
          id="span-current-label">{deviceStore.currentDevice?.device_label}</span></p>
        <input type="text" name="label" placeholder="New label"/>
        <button type="button" id="label-update-button">Update</button>
        <br/><br/>
        <p className="list-title">Remove other device(s)</p>
        <p className="list-message">
          * Click or touch if you'd like to remove specific device from our server.
        </p>
        <ul id="ul-other-devices">
          {deviceStore.devicesWithoutMe.map((d) =>
            <OtherDevice
              key={d.device_id.toString()}
              device={d}
              onRemoved={(res) => { setMsg(res ? 'Successfully removed !' : 'Failed to remove ...') }}
            />
          )}
        </ul>
        <p className="message">
          Go back to <a style={{ cursor: 'pointer' }} onClick={() => history.replace('/pwa/devices')}>Previous page.</a>
        </p>
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
        <p className="message">
          Would you like to <a style={{ cursor: 'pointer' }}>Sign out?</a>
        </p>
        <p id="message-from-server" style={{ color: 'red' }}>{msg}</p>
      </div>
    </div>
  )
})

const OtherDevice: React.FC<{ device: Device, onRemoved: (success: boolean) => void }> = ({ device, onRemoved }) => {
  return (
    <li
      id={`device-${device.device_label}`}
      onClick={async () => {
        const res = await deviceStore.deleteDevice(device.device_id)
        onRemoved(res)
      }}
    >
      {device.device_label}
    </li>
  )
}

export default DeviceDetailScreen
