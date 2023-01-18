import React from 'react'

import s from '../PacksList.module.css'

import { PacsCardsButton } from './packCardsButtons/PackCardsButton'

export const SearchButton = () => {
  return (
    <>
      <span className={s.titleButton}> Show packs cards</span>
      <div>
        <PacsCardsButton />
      </div>
    </>
  )
}
