import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'

import { selectPreviousScore, allSubscriptions } from './selectors'
import {
  updateScore,
  deleteScore,
  saveSubscribedMatches,
  deleteSubscription,
  subscribedMatch,
} from './actions'

export const useCrickStore = () => {
  const dispatch = useDispatch()

  const prevScore = useSelector(selectPreviousScore)
  const subscriptions = useSelector(allSubscriptions)

  const _updateScore = useCallback((data) => dispatch(updateScore(data)), [
    dispatch,
  ])
  const _deleteScore = useCallback(() => dispatch(deleteScore()), [dispatch])
  const _saveSubscription = useCallback(
    (data) => dispatch(saveSubscribedMatches(data)),
    [dispatch]
  )
  const _deleteSubscription = useCallback(
    (subscriptionId) => dispatch(deleteSubscription(subscriptionId)),
    [dispatch]
  )
  const _addSubscription = useCallback(
    (data) => dispatch(subscribedMatch(data)),
    [dispatch]
  )

  return {
    prevScore: prevScore,
    updatePrevScore: _updateScore,
    deleteScore: _deleteScore,
    saveSubscription: _saveSubscription,
    deleteSubscription: _deleteSubscription,
    addSubscription: _addSubscription,
    subscriptions: subscriptions,
  }
}
