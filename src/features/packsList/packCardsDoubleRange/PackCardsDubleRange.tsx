import React, { useState } from 'react'

import { SuperDoubleRange } from '../../../common/components/SuperDoubleRange/SuperDoubleRange'
import s from '../PacksList.module.css'

export const PackCardsDoubleRange = () => {
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(100)

  return (
    <div>
      <span className={s.titleButton}> Number of Cards</span>
      <div className={s.range}>
        <SuperDoubleRange
          value={[value1, value2]}
          onChangeRange={([value1, value2]) => {
            setValue1(value1)
            setValue2(value2)
          }}
        />
      </div>
    </div>
  )
}
