export const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://cumulus.hoons.io:5000'
  : 'http://localhost:5000'
export const P2P_URL = 'https://cumulus.hoons.io:8080'

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCXthCGTDqn-f5Nd0MY5L-Nnxg8g-f6XtQ',
  authDomain: 'mobedchulcheck.firebaseapp.com',
  databaseURL: 'https://mobedchulcheck-default-rtdb.firebaseio.com',
  projectId: 'mobedchulcheck',
  storageBucket: 'mobedchulcheck.appspot.com',
  messagingSenderId: '1078947672432',
  appId: '1:1078947672432:web:b0edff6e66a8c2234adfb5',
  measurementId: 'G-3H44NW5EKZ'
}

export const FCM_KEY = 'BFuII-gSgT5PGZwFUktwc49VCUmQURyMGexOTzkOcdS3_rNPDgZ9PJIvvs-1FMCBfIx65CevzmZ2O1mduWlugYM'

export const PC_CONFIG = {
  'iceServers': [
    {
      urls: 'stun:stun.l.google.com:19302'
    },
    {
      urls: 'stun:stun1.l.google.com:19302'
    },
    {
      urls: 'stun:stun2.l.google.com:19302'
    },
    {
      urls: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com'
    }
  ]
}
