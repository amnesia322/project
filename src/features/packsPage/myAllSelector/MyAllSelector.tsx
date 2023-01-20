import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { setUserPacks } from '../packs-reducer'
import s from '../PacksPage.module.css'

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
          >
            My
          </SuperButton>
          <SuperButton
            onClick={() => {
              allPackHandler()
            }}
            style={offStyle}
            disabled={appStatus === 'loading'}
          >
            All
          </SuperButton>
        </div>
      </div>
    </>
  )
}
