import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ClassicButton } from '../../../common/components/ClassicButton/ClassicButton'
import { PaginationComponent } from '../../../common/components/Pagination/PaginationComponent'
import { BackToPackList } from '../backToPackListButton/BackToPackList'
import s from '../PacksList.module.css'
import { SearchInput } from '../SearchInput/SearchInput'

import { CardItem } from './CardItem'
import { addCardTC, setCardsTC } from './cards-reducer'

export const Cards = () => {
  const myId = useAppSelector(state => state.profile.user._id)
  const cardsPack_id = useAppSelector(state => state.cards.queryParams.cardsPack_id)
  const query = useAppSelector(state => state.cards.queryParams)
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.queryParams.pageCount)

  const dispatch = useAppDispatch()

  const userPack_id = useAppSelector(state => {
    const chosenPack = state.packs.cardPacks.find(item => item._id === cardsPack_id)

    if (chosenPack) {
      return chosenPack.user_id
    }
  })

  useEffect(() => {
    dispatch(setCardsTC(cardsPack_id))
  }, [page, cardsPack_id, query, pageCount])

  const cards = useAppSelector(state => state.cards.cards)
  const isMyId = myId === userPack_id

  const addCardHandler = () => {
    dispatch(addCardTC({ card: { cardsPack_id } }))
  }

  return (
    <div className={s.wrapper}>
      <BackToPackList />
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
        {!!cards.length && <SearchInput />}
        <CardItem isMyId={isMyId} />
      </div>
      {totalCount > 5 && !!cards.length && (
        <PaginationComponent
          pageCount={pageCount}
          totalCount={totalCount}
          currentPage={page}
          isThisPlaceCards={true}
        />
      )}
    </div>
  )
}
