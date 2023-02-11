import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'
import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../app/store'
import { emptyQueryParams, refreshFilters } from '../packs-reducer'

export const RefreshFilter = ({ setSearchParams }: RefreshFilterPropsType) => {
  const dispatch = useAppDispatch()
  const onClickHandler = () => {
    dispatch(refreshFilters(emptyQueryParams))
    setSearchParams({})
  }

  return (
    <Tooltip title="Clear all filters">
      <Button variant={'outlined'} onClick={onClickHandler}>
        <FilterAltOffOutlinedIcon />
      </Button>
    </Tooltip>
  )
}

type RefreshFilterPropsType = {
  setSearchParams: Function
}
