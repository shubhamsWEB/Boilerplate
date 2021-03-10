import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers'
const matchId = localStorage.getItem('matchId');
const persistConfig = {
  key: `match-${matchId}`,
  storage:storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
export default () => {
  let store = createStore(persistedReducer,composeWithDevTools())
  let persistor = persistStore(store)
  return { store, persistor }
}