import React from 'react'

import { Link } from 'react-router-dom'

import { PATH } from '../../../app/Routes/Pages'
import { useAppSelector } from '../../../app/store'
import { ClassicButton } from '../../../common/components/ClassicButton/ClassicButton'
import s from '../PacksList.module.css'

import { CardItem } from './CardItem'

export const Cards = () => {
  const myId = useAppSelector(state => state.profile.user._id)
  const idChosedPack = useAppSelector(state => state.cards.queryParams.cardsPack_id)

  console.log('idChosedPack:' + idChosedPack)
  const userIdFromPack = useAppSelector(state => {
    const choosedPack = state.packs.cardPacks.find(item => item._id === idChosedPack)

    if (choosedPack) {
      console.log('choosedPack: ' + choosedPack._id)

      return choosedPack.user_id
    }
  })
  const comparedId = myId === userIdFromPack

  console.log('MY_ID:' + myId, userIdFromPack, comparedId)

  return (
    <div className={s.wrapper}>
      <div className={s.titleLink}>
        <Link to={PATH.PACK_LIST}>Back to Packs List</Link>
      </div>
      {comparedId ? (
        <div className={s.wrapperButton}>
          <div className={s.titleTable}>My Pack</div>
          <ClassicButton title={'Add new card'} />
        </div>
      ) : (
        <div className={s.wrapperButton}>
          <div className={s.titleTable}>Friend’s Pack</div>
          <ClassicButton title={'Learn to pack'} />
        </div>
      )}
      <div className={s.wrapperTable}>
        <CardItem comparedId={comparedId} />
      </div>
    </div>
  )
}
