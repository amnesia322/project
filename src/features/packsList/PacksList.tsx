import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'

import { PackItem } from './packItem/PackItem'
import { getPacksTC } from './packs-reducer'
import s from './PacksList.module.css'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.allCardPacks.cardPacks)

  useEffect(() => {
    dispatch(getPacksTC())
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
            <div className={s.titleTable}>Name Pask</div>
          </div>
        )}
      </div>
      <div className={s.wrapperTable}></div>
      <PackItem />
    </div>
  )
}
