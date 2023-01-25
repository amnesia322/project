import React from 'react'

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'

import { useAppDispatch } from '../../../app/store'
import { emptyQueryParams, refreshFilters } from '../packs-reducer'

export const RefreshFilter = ({ setSearchParams }: RefreshFilterPropsType) => {
  const dispatch = useAppDispatch()
  const onClickHandler = () => {
    dispatch(refreshFilters(emptyQueryParams))
    setSearchParams({})
  }

  return (
    <button onClick={onClickHandler}>
      <FilterAltOffOutlinedIcon />
    </button>
  )
}

type RefreshFilterPropsType = {
  setSearchParams: Function
}
