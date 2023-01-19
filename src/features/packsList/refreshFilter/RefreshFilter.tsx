import React from 'react'

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'

import { useAppDispatch } from '../../../app/store'
import { emptyQueryParams, refreshFilters } from '../packs-reducer'

export const RefreshFilter = () => {
  const dispatch = useAppDispatch()
  const onClickHandler = () => {
    dispatch(refreshFilters(emptyQueryParams))
  }

  return (
    <button onClick={onClickHandler}>
      <FilterAltOffOutlinedIcon />
    </button>
  )
}
