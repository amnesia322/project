import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ClassicButton } from '../../../common/components/ClassicButton/ClassicButton'
import { PaginationComponent } from '../../../common/components/Pagination/PaginationComponent'
import { SearchComponent } from '../../../common/components/SearchComponent/SearchComponent'
import { BackToPackList } from '../backToPackListButton/BackToPackList'
import { deletePackTC, editPackTitleTC } from '../packs-reducer'

import { CardItem } from './CardItem'
import { addCardTC, setCardsTC } from './cards-reducer'
import s from './Cards.module.css'
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
  }, [page, id, pageCount, query.cardQuestion, query.min, query.max, query.sortCards])

  const isMyId = myId === chosenPack?.user_id

  const addCardHandler = () => {
    dispatch(addCardTC({ card: { cardsPack_id } }))
  }
  const editPackHandler = () => {
    dispatch(
      editPackTitleTC({ cardsPack: { _id: cardsPack_id, name: '!Updated The Best team pack!' } })
    )
  }
  const deletePackHandler = () => {
    dispatch(deletePackTC(cardsPack_id))
  }
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
              onEditHandler={editPackHandler}
              onDeleteHandler={deletePackHandler}
              onLearnHandler={learnPackHandler}
            />
          </div>
          {!!cards.length && <ClassicButton title={'Add new card'} onClick={addCardHandler} />}
        </div>
      ) : (
        <div className={s.wrapperButton}>
          <div className={s.titleTable}>{chosenPack?.name}</div>
          {!!cards.length && <ClassicButton title={'Learn to pack'} />}
        </div>
      )}
      <div className={s.wrapperTable}>
        <div className={s.wrapperForSearchComponent}>
          {!!cards.length && <SearchComponent isThisPlaceCards={true} />}
        </div>
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
