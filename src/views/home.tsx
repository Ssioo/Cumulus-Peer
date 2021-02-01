import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { userStore } from '../stores/user'

const HomeScreen = () => {
  const history = useHistory()

  useEffect(() => {
    userStore.verifyAuth().then((s) => {
      if (s) history.replace('/pwa/devices')
      else history.replace('/pwa/signin')
    })
  }, [])

  return (<div>Please wait for a second...</div>)
}

export default HomeScreen
