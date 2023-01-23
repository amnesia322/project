import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { BackToPackList } from '../../../common/components/BackToPackListButton/BackToPackList'
import { ClassicButton } from '../../../common/components/ClassicButton/ClassicButton'
import { PaginationComponent } from '../../../common/components/Pagination/PaginationComponent'
import { SearchComponent } from '../../../common/components/SearchComponent/SearchComponent'

import { setCardsTC } from './cards-reducer'
import s from './Cards.module.css'
import { CardsList } from './CardsList/CardsList'
import { AddCardModal } from './CardsList/cardsModals/addCardModal/AddCardModal'
import { MyPackMenu } from './myPackMenu/MyPackMenu'

export const Cards = () => {
  const myId = useAppSelector(state => state.profile.user._id)
  const cardsPack_id = useAppSelector(state => state.cards.queryParams.cardsPack_id)
  const query = useAppSelector(state => state.cards.queryParams)
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.queryParams.pageCount)
  const cards = useAppSelector(state => state.cards.cards)
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const chosenPack = useAppSelector(state => {
    const chosenPack = state.packs.cardPacks.find(item => item._id === cardsPack_id)

    if (chosenPack) {
      return chosenPack
    }
  })

  useEffect(() => {
    dispatch(setCardsTC(id || cardsPack_id))
  }, [
    dispatch,
    totalCount,
    page,
    id,
    pageCount,
    query.cardQuestion,
    query.min,
    query.max,
    query.sortCards,
  ])

  const isMyId = myId === chosenPack?.user_id

  const learnPackHandler = () => {
    alert('learnPackHandler')
  }

  return (
    <div className={s.wrapper}>
      <BackToPackList />
      {isMyId ? (
        <div className={s.wrapperButton}>
          <div className={s.titleTable}>
            <span className={s.titlePack}>{chosenPack?.name}</span>
            <MyPackMenu
              onLearnHandler={learnPackHandler}
              packId={cardsPack_id}
              packName={chosenPack.name}
              isPrivate={chosenPack.private}
            />
          </div>
          {!!cards.length && (
            <AddCardModal cardsPack_id={cardsPack_id}>
              <ClassicButton title={'Add new card'} />
            </AddCardModal>
          )}
        </div>
      ) : (
        <div className={s.wrapperButton}>
          <div className={s.titleTable}>{chosenPack?.name}</div>
          {totalCount && <ClassicButton title={'Learn to pack'} />}
        </div>
      )}
      <div className={s.wrapperTable}>
        <div className={s.wrapperForSearchComponent}>
          {totalCount && <SearchComponent isThisPlaceCards={true} />}
        </div>
        <CardsList isMyId={isMyId} />
      </div>
      {totalCount > 5 && (
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
