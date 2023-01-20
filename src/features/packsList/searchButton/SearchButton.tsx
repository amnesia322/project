import React from 'react'

import s from '../PacksList.module.css'

import { PacksCardsButton } from './packCardsButtons/PackCardsButton'

export const SearchButton = () => {
  return (
    <>
      <span className={s.titleButton}> Show packs cards</span>
      <div>
        <PacksCardsButton />
      </div>
    </>
  )
}
