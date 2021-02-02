import React, { useState } from 'react'
import './css/popup.css'
import { userStore } from '../stores/user'
import { useHistory } from 'react-router-dom'

const SignInScreen = () => {
  const [signMode, setSignMode] = useState<0 | 1>(0)
  const [signMessage, setSignMessage] = useState('')

  const toggleSignMode = (mode: 0 | 1) => {
    setSignMode(mode)
  }

  return (
    <div className="login-page">
      <div className="form">
        {signMode === 1 ?
          <SignUpForm onToggle={toggleSignMode} onReceiveMessage={setSignMessage}/>
          : <SignInForm onToggle={toggleSignMode} onReceiveMessage={setSignMessage}/>
        }
        <p id="message-from-server" style={{ color: 'red' }}>{signMessage}</p>
      </div>
    </div>
  )
}

const SignInForm: React.FC<{
  onToggle: (mode: 0 | 1) => void,
  onReceiveMessage: (msg: string) => void
}> = ({ onToggle, onReceiveMessage }) => {
  const history = useHistory()

  const [name, setName] = useState('')
  const [pwd, setPwd] = useState('')

  const onClickSignIn = async () => {
    const res = await userStore.trySignIn(name, pwd)
    if (res) history.replace('/pwa/devices')
    onReceiveMessage('')
  }

  return (
    <form>
      <h2>Cumulus</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={pwd}
        onChange={({ target }) => setPwd(target.value)}
      />
      <button
        type="button"
        id="sign-in-button"
        onClick={onClickSignIn}
      >
        sign in
      </button>
      <p className="message">
        Not registered?
        <a
          style={{ cursor: 'pointer' }}
          onClick={() => {
            onToggle(1)
          }}
        >
          Create an account
        </a>
      </p>
    </form>
  )
}

const SignUpForm: React.FC<{
  onToggle: (mode: 0 | 1) => void,
  onReceiveMessage: (msg: string) => void
}> = ({ onToggle, onReceiveMessage }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [pwdConfirm, setPwdConfirm] = useState('')
  const [isSignUpComplete, setSignUpComplete] = useState(false)

  const onClickSignUp = async () => {
    const res = await userStore.trySignUp(name, email, pwd, pwdConfirm)
    if (res)
      onReceiveMessage(res.message)
    setSignUpComplete(!!res?.success)
  }

  return (
    <form>
      <h2>Cumulus - Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <input
        type="text"
        name="email"
        placeholder="Email address"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={pwd}
        onChange={({ target }) => setPwd(target.value)}
      />
      <input
        type="password"
        name="password-confirm"
        placeholder="Confirm password"
        value={pwdConfirm}
        onChange={({ target }) => setPwdConfirm(target.value)}
      />
      <p className="terms-and-condition">
        By clicking on Sign up, you agree to Cumulus' Terms and Conditions Use.
      </p>
      <button
        type="button"
        id="sign-up-button"
        onClick={onClickSignUp}
      >
        sign up
      </button>
      <p className="message">
        {isSignUpComplete ?
          'Sign In with your new username.'
          : 'Already registered?'}
          <a
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (isSignUpComplete) onToggle(0)
              else onToggle(0)
            }}
          >
            Sign In
          </a>
      </p>
    </form>
  )
}

export default SignInScreen
