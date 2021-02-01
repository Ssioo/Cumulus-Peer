import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/messaging'
import { FCM_KEY, FIREBASE_CONFIG } from './utils/constants'

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG)
firebase.analytics()

const messaging = firebase.messaging()
messaging.getToken({ vapidKey: FCM_KEY })
messaging.onMessage((payload) => {
  console.log('onMessage', payload)
  const notification = new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
    badge: payload.notification.icon,
    vibrate: payload.notification.vibrate ?? payload.notification.vibrateTimingsMillis,
  })
  notification.onclick = (event) => {
    notification.close()
    window.open('https://mobedchulcheck.netlify.app/')
  }
})

ReactDOM.render(<App/>, document.getElementById('root'))

serviceWorkerRegistration.register()
