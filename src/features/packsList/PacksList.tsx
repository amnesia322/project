import React, { useEffect } from 'react'

import { useAppDispatch } from '../../app/store'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'

import { PackItem } from './packItem/PackItem'
import { addPackTC, setPacksTC } from './packs-reducer'
import s from './PacksList.module.css'

export const PacksList = () => {
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(addPackTC({ cardsPack: { name: '!The Best team pack!' } }))
  }

  useEffect(() => {
    dispatch(setPacksTC())
  }, [])

  return (
    <div className={s.wrapper}>
      <div className={s.titleContainer}>
        <div className={s.titleTable}>Packs list</div>
        <ClassicButton title={'Add new pack'} onClick={onClickHandler} />
      </div>
      <div className={s.wrapperTable}>
        <PackItem />
      </div>
    </div>
  )
}
