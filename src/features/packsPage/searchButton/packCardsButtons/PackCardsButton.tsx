import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import SuperButton from '../../../../common/components/SuperButton/SuperButton'
import { setUserPacks } from '../../packs-reducer'

export const PacksCardsButton = () => {
  const myPacks = useAppSelector(state => state.packs.queryParams.user_id)
  const userId = useAppSelector(state => state.profile.user._id)
  const dispatch = useAppDispatch()
  const userPackHandler = () => {
    dispatch(setUserPacks(userId))
  }
  const allPackHandler = () => {
    dispatch(setUserPacks(''))
  }
  const onStyle = {
    backgroundColor: myPacks ? '#1976d2' : '#EFEFEF',
    color: !myPacks ? 'black' : 'white',
    width: '85px',
    height: '36px',
  }
  const offStyle = {
    backgroundColor: myPacks ? '#EFEFEF' : '#1976d2',
    color: myPacks ? 'black' : 'white',
    width: '85px',
    height: '36px',
  }

  return (
    <div>
      <SuperButton
        onClick={() => {
          userPackHandler()
        }}
        style={onStyle}
      >
        My
      </SuperButton>
      <SuperButton
        onClick={() => {
          allPackHandler()
        }}
        style={offStyle}
      >
        All
      </SuperButton>
    </div>
  )
}
