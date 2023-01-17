import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'

import { PackItem } from './packItem/PackItem'
import { addPackTC, setPacksTC } from './packs-reducer'
import s from './PacksList.module.css'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.allCardPacks.cardPacks)

  const onClickHandler = () => {
    dispatch(addPackTC({ cardsPack: { name: '!The Best team pack!' } }))
  }

  useEffect(() => {
    dispatch(setPacksTC())
  }, [])

  return (
    <div className={s.wrapper}>
      <div className={s.wrapperButton}>
        {packs.length ? (
          <>
            <div className={s.titleTable}>Packs list</div>
            <ClassicButton title={'Add new pack'} />
          </>
        ) : (
          <div>
            <div className={s.titleTable}>Is not Packs here</div>
          </div>
        )}
      </div>
      <div className={s.wrapperTable}></div>
      <PackItem />
    </div>
  )
}
