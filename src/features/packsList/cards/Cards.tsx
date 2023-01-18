import React from 'react'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { PATH } from '../../../app/Routes/Pages'
import { useAppSelector } from '../../../app/store'
import { ClassicButton } from '../../../common/components/ClassicButton/ClassicButton'
import s from '../PacksList.module.css'

import { CardItem } from './CardItem'
import { addCardTC } from './cards-reducer'

export const Cards = () => {
  const myId = useAppSelector(state => state.profile.user._id)
  const cardsPack_id = useAppSelector(state => state.cards.queryParams.cardsPack_id)

  const dispatch = useDispatch()

  const userPack_id = useAppSelector(state => {
    const chosenPack = state.packs.cardPacks.find(item => item._id === cardsPack_id)

    if (chosenPack) {
      return chosenPack.user_id
    }
  })
  const cards = useAppSelector(state => state.cards.cards)
  const isMyId = myId === userPack_id

  const addCardHandler = () => {
    // dispatch(addCardTC({ cardsPack_id: '63c7ff3d4f1df4292cf0c1cd' }))
  }

  return (
    <div className={s.wrapper}>
      <div className={s.titleLink}>
        <Link to={PATH.PACK_LIST}>Back to Packs List</Link>
      </div>
      {isMyId ? (
        <div className={s.wrapperButton}>
          <div className={s.titleTable}>My Pack</div>
          {!!cards.length && <ClassicButton title={'Add new card'} onClick={addCardHandler} />}
        </div>
      ) : (
        <div className={s.wrapperButton}>
          <div className={s.titleTable}>Friend’s Pack</div>
          {!!cards.length && <ClassicButton title={'Learn to pack'} />}
        </div>
      )}
      <div className={s.wrapperTable}>
        <CardItem comparedId={isMyId} />
      </div>
    </div>
  )
}
