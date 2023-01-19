import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../app/store'
import img from '../../assets/svg/cleanFilter.svg'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import { PaginationComponent } from '../../common/components/Pagination/PaginationComponent'
import { SearchComponent } from '../../common/components/SearchComponent/SearchComponent'

import { PacsCardsButton } from './packCardsButtons/PackCardsButton'
import { PackCardsDoubleRange } from './packCardsDoubleRange/PackCardsDubleRange'
import { PackItem } from './packItem/PackItem'
import { addPackTC, setPacksTC } from './packs-reducer'
import s from './PacksList.module.css'
import { SearchButton } from './searchButton/SearchButton'
import { SearchInput } from './SearchInput/SearchInput'
import { RefreshFilter } from './refreshFilter/RefreshFilter'
export const PacksList = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector(state => state.packs.queryParams)
  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.queryParams.pageCount)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const isFetched = useAppSelector(state => state.packs.isPacksFetched)
  const onClickHandler = () => {
    dispatch(addPackTC({ cardsPack: { name: '!The Best team pack!' } }))
  }

  useEffect(() => {
    dispatch(setPacksTC())
  }, [page, query, pageCount, query.user_id, query.max])

  if (!isFetched) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      {packs.length ? (
        <>
          <div className={s.wrapperButton}>
            <div className={s.titleTable}>Packs list</div>
            <ClassicButton title={'Add new pack'} onClick={onClickHandler} />
          </div>
          <div className={s.wrapperTable}></div>
          <div className={s.wrapperForHeaderTable}>
            <SearchComponent isThisPlaceCards={false} />
            <div className={s.wrapperFilterButton}>
              <SearchButton />
              <span className={s.titleButton}> Show packs cards</span>
              <div>
                <PacsCardsButton />
              </div>
            </div>
            <div className={s.wrapperForRange}>
              <span className={s.titleButton}> Number of Cards</span>
              <PackCardsDoubleRange />
            </div>
            <img className={s.cleanFilter} src={img} alt={'img'} />
            <div>
              <RefreshFilter />
            </div>
          </div>
          <PackItem />
          <PaginationComponent
            pageCount={pageCount}
            totalCount={totalCount}
            currentPage={page}
            isThisPlaceCards={false}
          />
        </>
      ) : (
        <div>
          <div className={s.titleTable}>Is not Packs here</div>
          <div className={s.wrapperForTitle}>
            <div className={s.titleForEmptyPack}>This packs list is empty</div>
            <ClassicButton title={'Add new pack'} />
          </div>
        </div>
      )}
    </div>
  )
}
