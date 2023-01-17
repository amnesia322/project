import React from 'react'

import { Link } from 'react-router-dom'

import { PATH } from '../../../app/Routes/Pages'
import { useAppSelector } from '../../../app/store'
import { ClassicButton } from '../../../common/components/ClassicButton/ClassicButton'
import s from '../PacksList.module.css'

import { CardQuestion } from './CardQuestion'

export const Cards = () => {
  const myId = useAppSelector(state => state.profile.user._id)
  const idChosedPack = useAppSelector(state => state.allCardPacks.packIdForWork)
  const userIdFromPack = useAppSelector(state => {
    const choosedPack = state.allCardPacks.cardPacks.find(item => item._id === idChosedPack)

    if (choosedPack) {
      return choosedPack.user_id
    }
  })
  const cards = useAppSelector(state => state.allCardQuestions.cards)
  const comparedId = myId === userIdFromPack

  return (
    <div className={s.wrapper}>
      <div className={s.titleLink}>
        <Link to={PATH.PACK_LIST}>Back to Packs List</Link>
      </div>
      {comparedId ? (
        <div className={s.wrapperButton}>
          <div className={s.titleTable}>My Pack</div>
          {!!cards.length && <ClassicButton title={'Add new card'} />}
        </div>
      ) : (
        <div className={s.wrapperButton}>
          <div className={s.titleTable}>Friend’s Pack</div>
          {!!cards.length && <ClassicButton title={'Learn to pack'} />}
        </div>
      )}
      <div className={s.wrapperTable}>
        <CardQuestion comparedId={comparedId} />
      </div>
    </div>
  )
}
