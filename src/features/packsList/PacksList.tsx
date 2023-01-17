import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import SuperInputText from '../../common/components/SuperInputText/SuperInputText'

import { PackItem } from './packItem/PackItem'
import { getPacksTC } from './packs-reducer'
import s from './PacksList.module.css'

// import search from '../../assets/svg/IconSearch.svg'
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
            <div className={s.titleTable}>Is not Packs here</div>
          </div>
        )}
      </div>
      <div className={s.wrapperTable}></div>
      <div className={s.wrapperForHeaderTable}>
        <div>
          <span className={s.titleButton}> Search</span>
          <SuperInputText className={s.input} placeholder={'Provide your text'} />
        </div>
        <div className={s.wrapperFilterButton}>
          <span className={s.titleButton}> Show packs cards</span>
          <div>
            <ClassicButton title={'My'} sx={{}} /> <ClassicButton title={'All'} />
          </div>
        </div>
      </div>
      <PackItem />
    </div>
  )
}
