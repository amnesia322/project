import React, { useEffect } from 'react'

import { FormControl, MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { setCardsCurrentPage, setCardsPerPage } from '../../../features/cards/cards-reducer'
import { SearchParamsType } from '../../../features/packs/Packs'
import { setPacksCurrentPage, setPacksPerPage } from '../../../features/packs/packs-reducer'

import s from './PaginationComponent.module.css'

export const PaginationComponent = (props: PaginationPropsType) => {
  const { currentPage, pageCount, totalCount, isThisPlaceCards } = props
  const appStatus = useAppSelector(state => state.app.status)
  const limit = Math.ceil(totalCount / pageCount)
  const dispatch = useAppDispatch()
  const perPageValue = pageCount.toString()

  useEffect(() => {
    if (limit < currentPage) {
      if (isThisPlaceCards) dispatch(setCardsCurrentPage({ page: 1 }))
      if (!isThisPlaceCards) dispatch(setPacksCurrentPage({ page: 1 }))
    }
  }, [dispatch, currentPage, limit])

  const handler = (event: React.ChangeEvent<unknown>, currentPage: number) => {
    if (isThisPlaceCards) dispatch(setCardsCurrentPage({ page: currentPage }))
    if (!isThisPlaceCards) {
      dispatch(setPacksCurrentPage({ page: currentPage }))
      props.setSearchParams({ ...props.params, page: currentPage })
    }
  }

  const perPageHandler = (event: SelectChangeEvent) => {
    const pageCount = +event.target.value

    if (isThisPlaceCards) dispatch(setCardsPerPage({ pageCount: pageCount }))
    if (!isThisPlaceCards) dispatch(setPacksPerPage({ packsPerPage: pageCount }))
  }

  return (
    <div className={s.container}>
      <Pagination
        onChange={handler}
        page={currentPage}
        count={limit}
        disabled={appStatus === 'loading'}
      />
      <div className={s.perPage}>
        <div>Show</div>
        <FormControl sx={{ margin: '0 1rem' }} size="small">
          <Select
            sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}
            value={perPageValue}
            onChange={perPageHandler}
          >
            <MenuItem className={s.menuItem} value={5}>
              5
            </MenuItem>
            <MenuItem className={s.menuItem} value={10}>
              10
            </MenuItem>
            <MenuItem className={s.menuItem} value={15}>
              15
            </MenuItem>
          </Select>
        </FormControl>
        <div>packs per page</div>
      </div>
    </div>
  )
}

type PaginationPropsType = {
  pageCount: number
  totalCount: number
  currentPage: number
  isThisPlaceCards: boolean
  setSearchParams: Function
  params: SearchParamsType
}
