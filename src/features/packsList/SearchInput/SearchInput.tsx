import React from 'react'

import SuperInputText from '../../../common/components/SuperInputText/SuperInputText'
import s from '../PacksList.module.css'
export const SearchInput = () => {
  return (
    <div>
      <span className={s.titleButton}> Search</span>
      <SuperInputText className={s.input} placeholder={'Provide your text'} />
    </div>
  )
}
