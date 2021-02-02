import React, { useEffect, useState } from 'react'
import './css/popup.css'
import { deviceStore } from '../stores/device'
import { useHistory } from 'react-router-dom'

const EnrollDeviceScreen = () => {
  const history = useHistory()
  const [label, setLabel] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {

  }, [])


  const onSubmit = async () => {
    const res = await deviceStore.enrollDevice(label)
    if (res) history.replace('/pwa/devices')
    else setMsg('Inappropriate label.')
  }

  return (
    <div className="login-page">
      <div className="form">
        <form>
          <h2>Cumulus - Device Register</h2>
          <p style={{ textAlign: 'left' }}>
            It seems that your device is not currently registered.<br/>
            Please write down the label or name of your device.
          </p>
          <input
            type="text"
            name="label"
            placeholder="Device label"
            value={label}
            onChange={({ target }) => setLabel(target.value)}
          />
          <button type="button" id="register-button" onClick={onSubmit}>
            register
          </button>
        </form>
        <p id="message-from-server" style={{ color: 'red' }}>{msg}</p>
      </div>
    </div>
  )
}

export default EnrollDeviceScreen
