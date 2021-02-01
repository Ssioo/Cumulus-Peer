import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('./views/home'))
const SignIn = lazy(() => import('./views/signin'))
const EnrollDevice = lazy(() => import('./views/enroll-device'))
const Devices = lazy(() => import('./views/devices'))
const DeviceDetail = lazy(() => import('./views/device-detail'))

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path='/pwa'>
            <Home />
          </Route>
          <Route exact path='/pwa/signin'>
            <SignIn/>
          </Route>
          <Route exact path='/pwa/enroll_devices'>
            <EnrollDevice/>
          </Route>
          <Route exact path='/pwa/devices'>
            <Devices/>
          </Route>
          <Route exact path='/pwa/advanced_options'>
            <DeviceDetail/>
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
