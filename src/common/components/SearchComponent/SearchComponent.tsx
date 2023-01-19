import React, { ChangeEvent, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputBase } from '@mui/material'
import Paper from '@mui/material/Paper'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { setCardsQuestion } from '../../../features/packsList/cards/cards-reducer'
import { setSortPacksName } from '../../../features/packsList/packs-reducer'
import s from '../../../features/packsList/PacksList.module.css'
import { useDebounce } from '../../hooks/useDebounce'

export const SearchComponent = (props: SearchComponentPropsType) => {
  const cardsNameValue = useAppSelector(state => state.cards.queryParams.cardQuestion)
  const packsNameValue = useAppSelector(state => state.packs.queryParams.packName)
  const initValue = props.isThisPlaceCards ? cardsNameValue : packsNameValue

  const dispatch = useAppDispatch()
  const [value, setValue] = useState<string>('')
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValue(e.currentTarget.value)

  const debouncedValue = useDebounce<string>(value, 700)

  useEffect(() => {
    props.isThisPlaceCards ? dispatch(setCardsQuestion(value)) : dispatch(setSortPacksName(value))
  }, [dispatch, debouncedValue, packsNameValue])

  useEffect(() => {
    if (initValue === '') setValue('')
  }, [initValue])

  return (
    <div>
      <span className={s.titleButton}> Search</span>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Provide your text"
          inputProps={{ 'aria-label': 'Provide your text' }}
          value={value}
          onChange={onChangeHandler}
        />
      </Paper>
    </div>
  )
}

type SearchComponentPropsType = {
  isThisPlaceCards: boolean
}
