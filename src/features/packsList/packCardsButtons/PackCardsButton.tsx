import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { setUserPacks } from '../packs-reducer'

export const PacsCardsButton = () => {
  const [onOff, setOnOff] = useState(false)
  const userId = useAppSelector(state => state.profile.user._id)
  const dispatch = useAppDispatch()
  const userPackHandler = () => {
    dispatch(setUserPacks(userId))
  }
  const allPackHandler = () => {
    dispatch(setUserPacks(''))
  }

  const onStyle = {
    backgroundColor: onOff ? '#1976d2' : '#EFEFEF',
    color: !onOff ? 'black' : 'white',
  }
  const offStyle = {
    backgroundColor: onOff ? '#EFEFEF' : '#1976d2',
    color: onOff ? 'black' : 'white',
  }

  return (
    <div>
      <SuperButton
        onClick={() => {
          setOnOff(true)
          userPackHandler()
        }}
        style={onStyle}
      >
        My
      </SuperButton>
      <SuperButton
        onClick={() => {
          setOnOff(false)
          allPackHandler()
        }}
        style={offStyle}
      >
        All
      </SuperButton>
    </div>
  )
}
