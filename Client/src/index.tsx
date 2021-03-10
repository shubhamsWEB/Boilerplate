import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './Containers/Core/app'
import './index.css'
import ErrorBoundery from './ErrorBoundary'
import { Provider } from 'react-redux'
import ConfigureStore from './store/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker'
import AxiosContext from './context/axios'
import { configAxios } from 'crickboardapi/axios'
const { store, persistor } = ConfigureStore()

ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundery>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AxiosContext.Provider
            value={configAxios('https://crickboardv2.herokuapp.com/api')}
          >
            <App />
          </AxiosContext.Provider>
        </PersistGate>
      </Provider>
    </ErrorBoundery>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.register(null)
