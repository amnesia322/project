import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import { PaginationComponent } from '../../common/components/Pagination/PaginationComponent'
import { SearchComponent } from '../../common/components/SearchComponent/SearchComponent'

import { PackCardsDoubleRange } from './packCardsDoubleRange/PackCardsDubleRange'
import { addPackTC, setPacksTC } from './packs-reducer'
import { PacksList } from './packsList/PacksList'
import s from './PacksPage.module.css'
import { RefreshFilter } from './refreshFilter/RefreshFilter'
import { SearchButton } from './searchButton/SearchButton'
export const PacksPage = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector(state => state.packs.queryParams)
  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.queryParams.pageCount)
  const isFetched = useAppSelector(state => state.packs.isPacksFetched)

  const onClickHandler = () => {
    dispatch(addPackTC({ cardsPack: { name: '!The Best team pack!' } }))
  }

  useEffect(() => {
    dispatch(setPacksTC())
  }, [page, pageCount, query.max, query.min, query.packName, query.user_id])

  if (!isFetched) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      {totalCount ? (
        <>
          <div className={s.wrapperButton}>
            <div className={s.titleTable}>Packs list</div>
            <ClassicButton title={'Add new pack'} onClick={onClickHandler} />
          </div>
          <div className={s.wrapperTable}></div>
          <div className={s.wrapperForHeaderTable}>
            <div className={s.wrapperForSearchComponent}>
              <SearchComponent isThisPlaceCards={false} />
            </div>
            <div className={s.wrapperFilterButton}>
              <SearchButton />
            </div>
            <div className={s.wrapperForRange}>
              <PackCardsDoubleRange />
            </div>
            <div className={s.wrapperForRefreshFilter}>
              <RefreshFilter />
            </div>
          </div>
          <PacksList />
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
