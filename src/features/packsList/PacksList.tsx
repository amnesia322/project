import React from 'react'

import { useAppDispatch } from '../../app/store'

import { PackItem } from './packItem/PackItem'
import { getPacksTC } from './packs-reducer'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const onClickHandler = () => {
    dispatch(getPacksTC())
  }

  return (
    <div>
      <div onClick={onClickHandler}>Hello Packs</div>
      <PackItem />
    </div>
  )
}
