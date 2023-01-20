import React, { useEffect, useState } from 'react'

import { Slider } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { setSliderValue } from '../packs-reducer'
import s from '../PacksPage.module.css'

export const PackCardsDoubleRange = () => {
  const appStatus = useAppSelector(state => state.app.status)
  const minSliderValue = useAppSelector(state => state.packs.minCardsCount)
  const maxSliderValue = useAppSelector(state => state.packs.maxCardsCount)
  const min = useAppSelector(state => state.packs.queryParams.min)
  const max = useAppSelector(state => state.packs.queryParams.max)
  const [sliderLocalValue, setSliderLocalValue] = useState<number[]>([min, max])

  const dispatch = useAppDispatch()

  useEffect(() => {
    setSliderLocalValue([minSliderValue, maxSliderValue])
  }, [minSliderValue, maxSliderValue])

  const changeValue = (event: Event, newValue: number | number[]) => {
    setSliderLocalValue(newValue as number[])
  }

  const changeCommitted = () => {
    dispatch(setSliderValue(sliderLocalValue))
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
