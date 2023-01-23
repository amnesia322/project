import React from 'react'

import { Slider } from '@material-ui/core'

type SuperDoubleRangePropsType = {
  onChangeRange?: (value: number[]) => void
  value?: number[]
}

export const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = ({ onChangeRange, value }) => {
  const handleChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    Array.isArray(value) && onChangeRange && onChangeRange(value)
  }

  return (
    <div style={{ width: 160 }}>
      <Slider value={value || [0, 100]} onChange={handleChange} valueLabelDisplay="auto" />
    </div>
  )
}
