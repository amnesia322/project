import React, { useEffect } from 'react'

import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { BackToPackList } from '../../../common/components/BackToPackListButton/BackToPackList'
import { ClassicButton } from '../../../common/components/ClassicButton/ClassicButton'
import { PaginationComponent } from '../../../common/components/Pagination/PaginationComponent'
import { SearchComponent } from '../../../common/components/SearchComponent/SearchComponent'

import { setCardsPerPage, setCardsTC } from './cards-reducer'
import s from './Cards.module.css'
import { CardsList } from './cardsList/CardsList'
import { AddCardModal } from './cardsList/cardsModals/addCardModal/AddCardModal'
import { MyPackMenu } from './myPackMenu/MyPackMenu'

export const Cards = () => {
  const myId = useAppSelector(state => state.profile.user._id)
  const cardsPack_id = useAppSelector(state => state.cards.queryParams.cardsPack_id)
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.queryParams.pageCount)
  const cardQuestion = useAppSelector(state => state.cards.queryParams.cardQuestion)
  const min = useAppSelector(state => state.cards.queryParams.min)
  const max = useAppSelector(state => state.cards.queryParams.max)
  const sortCards = useAppSelector(state => state.cards.queryParams.sortCards)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const chosenPack = useAppSelector(state => {
    const chosenPack = state.packs.cardPacks.find(item => item._id === cardsPack_id)

    if (chosenPack) {
      return chosenPack
    }
  })

  useEffect(() => {
    dispatch(setCardsTC(id || cardsPack_id))
  }, [dispatch, totalCount, page, cardsPack_id, pageCount, cardQuestion, min, max, sortCards])

  const isMyId = myId === chosenPack?.user_id

  const learnPackHandler = () => {
    dispatch(setCardsPerPage(totalCount))
    dispatch(setCardsTC(cardsPack_id))
    navigate('/learn')
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
              totalCount={totalCount}
            />
          </div>
          {!!totalCount && (
            <AddCardModal cardsPack_id={cardsPack_id}>
              <ClassicButton title={'Add new card'} />
            </AddCardModal>
          )}
        </div>
      ) : (
        <div className={s.wrapperButton}>
          <div className={s.titleTable}>{chosenPack?.name}</div>
          {!!totalCount && <ClassicButton title={'Learn to pack'} onClick={learnPackHandler} />}
        </div>
      )}
      <div className={s.wrapperTable}>
        <div className={s.wrapperForSearchComponent}>
          <SearchComponent
            isThisPlaceCards={true}
            setSearchParams={setSearchParams}
            params={params}
          />
        </div>
        <CardsList isMyId={isMyId} />
      </div>
      {totalCount > 5 && (
        <PaginationComponent
          pageCount={pageCount}
          totalCount={totalCount}
          currentPage={page}
          isThisPlaceCards={true}
          setSearchParams={setSearchParams}
          params={params}
        />
      )}
    </div>
  )
}
