import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import { PackCardsDoubleRange } from '../../common/components/PackCardsDoubleRange/PackCardsDubleRange'
import { PaginationComponent } from '../../common/components/Pagination/PaginationComponent'
import { SearchComponent } from '../../common/components/SearchComponent/SearchComponent'
import { sortingPacksMethods } from '../../common/constants/sortingMethods'

import { MyAllSelector } from './myAllSelector/MyAllSelector'
import {
  setPacksCurrentPage,
  setPacksTC,
  setSliderValue,
  setSortPacksName,
  setUserPacks,
} from './packs-reducer'
import { PacksList } from './packsList/PacksList'
import { AddPackModal } from './packsList/packsModals/addPackModal/AddPackModal'
import s from './PacksPage.module.css'
import { RefreshFilter } from './refreshFilter/RefreshFilter'
export const PacksPage = () => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.status)
  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const page = useAppSelector(state => state.packs.page)
  const isFetched = useAppSelector(state => state.packs.isPacksFetched)

  const maxFromState = useAppSelector(state => state.packs.queryParams.max)
  const minFromState = useAppSelector(state => state.packs.queryParams.min)
  const user_id = useAppSelector(state => state.packs.queryParams.user_id)
  const packName = useAppSelector(state => state.packs.queryParams.packName)
  const sortPacks = useAppSelector(state => state.packs.queryParams.sortPacks)
  const pageCount = useAppSelector(state => state.packs.queryParams.pageCount)

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  useEffect(() => {
    if (
      params.max &&
      params.min &&
      (+params.max !== maxFromState || +params.min !== minFromState)
    ) {
      dispatch(setSliderValue([+params.min, +params.max]))
    }
    if (params.user_id && params.user_id !== user_id) {
      dispatch(setUserPacks(params.user_id))
    }
    if (params.packName) dispatch(setSortPacksName(params.packName))
    if (params.page) dispatch(setPacksCurrentPage(+params.page))
  }, [])

  console.log('pack page render')

  useEffect(() => {
    dispatch(setPacksTC())
  }, [dispatch, page, pageCount, maxFromState, minFromState, packName, user_id, sortPacks])

  if (!isFetched) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      <div className={s.wrapperButton}>
        <div className={s.titleTable}>Packs list</div>
        <AddPackModal>
          <ClassicButton title={'Add new pack'} disabled={appStatus === 'loading'} />
        </AddPackModal>
      </div>
      <div className={s.wrapperTable}></div>
      <div className={s.wrapperForHeaderTable}>
        <div className={s.wrapperForSearchComponent}>
          <SearchComponent
            isThisPlaceCards={false}
            setSearchParams={setSearchParams}
            params={params}
          />
        </div>
        <div className={s.wrapperFilterButton}>
          <MyAllSelector setSearchParams={setSearchParams} params={params} />
        </div>
        <div className={s.wrapperForRange}>
          <PackCardsDoubleRange
            setSearchParams={setSearchParams}
            params={params}
            min={minFromState}
            max={maxFromState}
          />
        </div>
        <div className={s.wrapperForRefreshFilter}>
          <RefreshFilter setSearchParams={setSearchParams} />
        </div>
      </div>
      {totalCount ? (
        <>
          <PacksList />
          <PaginationComponent
            pageCount={pageCount}
            totalCount={totalCount}
            currentPage={page}
            isThisPlaceCards={false}
            setSearchParams={setSearchParams}
            params={params}
          />
        </>
      ) : (
        <div>
          <div className={s.wrapperForTitle}>
            <div className={s.titleForEmptyPack}>Packs list is empty. Сhange search parameters</div>
          </div>
        </div>
      )}
    </div>
  )
}

export type SearchParamsType = {
  min?: string
  max?: string
  pageCount?: string
  sortPacks?: sortingPacksMethods.desUpdate
  packName?: string
  user_id?: string
}
