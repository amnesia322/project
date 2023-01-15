import React from 'react'

import { useAppDispatch } from '../../app/store'

import { getPacksTC } from './packs-reducer'

export const PacksList = () => {
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(getPacksTC())
  }

  return <div onClick={onClickHandler}>Hello</div>
}
