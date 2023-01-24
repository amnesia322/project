import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { setUserPacks } from '../packs-reducer'

import s from './MyAllSelector.module.css'

export const MyAllSelector = () => {
  const appStatus = useAppSelector(state => state.app.status)
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
    backgroundColor: myPacks ? '#1976d2' : '#ffffff',
    color: myPacks ? 'white' : 'black',
  }
  const offStyle = {
    backgroundColor: myPacks ? '#ffffff' : '#1976d2',
    color: myPacks ? 'black' : 'white',
  }

  return (
    <>
      <span className={s.titleButton}> Show packs cards</span>
      <div>
        <div>
          <SuperButton
            onClick={() => {
              userPackHandler()
            }}
            style={onStyle}
            disabled={appStatus === 'loading'}
            className={s.filterButton}
          >
            My
          </SuperButton>
          <SuperButton
            onClick={() => {
              allPackHandler()
            }}
            style={offStyle}
            disabled={appStatus === 'loading'}
            className={s.filterButton}
          >
            All
          </SuperButton>
        </div>
      </div>
    </>
  )
}
