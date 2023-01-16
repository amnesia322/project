import React, { useEffect } from 'react'

import { useAppDispatch } from '../../app/store'

import { PackItem } from './packItem/PackItem'
import { getPacksTC } from './packs-reducer'
import s from './PacksList.module.css'

export const PacksList = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPacksTC())
  }, [])

  return (
    <div className={s.wrapper}>
      <div className={s.titleTable}>Packs list</div>
      <div className={s.wrapperTable}>
        <PackItem />
      </div>
    </div>
  )
}
