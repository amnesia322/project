import React from 'react'

import { FormControl, MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material'

import { useAppDispatch } from '../../../app/store'

import s from './PaginationComponent.module.css'

export const PaginationComponent = (props: PaginationPropsType) => {
  return (
    <div>
      <Pagination onChange={handler} page={currentPage} count={limit} />
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
}
