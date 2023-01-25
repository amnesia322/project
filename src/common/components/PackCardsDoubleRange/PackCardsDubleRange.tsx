import React, { useEffect, useState } from 'react'

import { Slider } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { setSliderValue } from '../../../features/packsPage/packs-reducer'
import { SearchParamsType } from '../../../features/packsPage/PacksPage'
import s from '../../../features/packsPage/PacksPage.module.css'

export const PackCardsDoubleRange = ({
  params,
  setSearchParams,
  min,
  max,
}: DoubleRangePropsType) => {
  const appStatus = useAppSelector(state => state.app.status)
  const minSliderValue = useAppSelector(state => state.packs.minCardsCount)
  const maxSliderValue = useAppSelector(state => state.packs.maxCardsCount)

  const initialMax = max > maxSliderValue ? maxSliderValue : max

  const [sliderLocalValue, setSliderLocalValue] = useState<number[]>([min, initialMax])

  const dispatch = useAppDispatch()

  useEffect(() => {
    setSliderLocalValue([min, initialMax])
  }, [min, max])

  const changeValue = (event: Event, newValue: number | number[]) => {
    setSliderLocalValue(newValue as number[])
  }

  const changeCommitted = () => {
    dispatch(setSliderValue(sliderLocalValue))
    setSearchParams({ ...params, min: sliderLocalValue[0], max: sliderLocalValue[1] })
  }

  return (
    <div className={s.main}>
      <span className={s.titleButton}>Number of Cards</span>
      <div className={s.sliderBlock}>
        <div className={s.value}>{sliderLocalValue[0]}</div>
        <div className={s.slider}>
          <Slider
            min={minSliderValue}
            max={maxSliderValue}
            value={sliderLocalValue}
            onChange={changeValue}
            onChangeCommitted={changeCommitted}
            disabled={appStatus === 'loading'}
          />
        </div>
        <div className={s.value}>{sliderLocalValue[1]}</div>
      </div>
    </div>
  )
}

type DoubleRangePropsType = {
  params: SearchParamsType
  setSearchParams: Function
  min: number
  max: number
}
