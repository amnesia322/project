import React, { ChangeEvent, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputBase } from '@mui/material'
import Paper from '@mui/material/Paper'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { setCardsQuestion } from '../../../features/packsPage/cards/cards-reducer'
import { setSortPacksName } from '../../../features/packsPage/packs-reducer'
import { SearchParamsType } from '../../../features/packsPage/PacksPage'
import s from '../../../features/packsPage/PacksPage.module.css'
import { useDebounce } from '../../hooks/useDebounce'

export const SearchComponent = ({
  isThisPlaceCards,
  params,
  setSearchParams,
}: SearchComponentPropsType) => {
  const cardsNameValue = useAppSelector(state => state.cards.queryParams.cardQuestion)
  const packsNameValue = useAppSelector(state => state.packs.queryParams.packName)
  const initValue = isThisPlaceCards ? cardsNameValue : packsNameValue

  const dispatch = useAppDispatch()
  const [value, setValue] = useState<string>(initValue)

  const debouncedValue = useDebounce<string>(value, 700)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    if (initValue === '') setValue('')
  }, [initValue])

  useEffect(() => {
    !isThisPlaceCards && setSearchParams({ ...params, packName: debouncedValue })
  }, [debouncedValue])

  useEffect(() => {
    if (isThisPlaceCards) {
      dispatch(setCardsQuestion(value))
    } else {
      dispatch(setSortPacksName(value))
    }
  }, [dispatch, debouncedValue, packsNameValue])

  return (
    <div>
      <span className={s.titleSearchButton}> Search</span>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          size={'small'}
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
  params: SearchParamsType
  setSearchParams: Function
}
