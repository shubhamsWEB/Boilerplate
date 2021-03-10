import {
  ADD_SCORE,
  DELETE_SCORE,
  SUBSCRIBE_MATCH,
  DELETE_SUBSCRIPTION,
  SAVE_SUBSCRIPTIONS,
} from '../constants'
export const updateScore = (data: any) => ({
  type: ADD_SCORE,
  payload: data,
})
export const deleteScore = () => ({
  type: DELETE_SCORE,
})
// save subscription of particular match after login
export const subscribedMatch = (data: any) => ({
  type: SUBSCRIBE_MATCH,
  payload: data,
})
// initial store state when user first login
export const saveSubscribedMatches = (data: any) => ({
  type: SAVE_SUBSCRIPTIONS,
  payload: data,
})
// delete subscription of particular match
export const deleteSubscription = (subscriptionId: number) => ({
  type: DELETE_SUBSCRIPTION,
  payload: subscriptionId,
})
