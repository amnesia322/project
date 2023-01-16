import React from 'react'

import { Link } from 'react-router-dom'

import { PATH } from '../../../app/Routes/Pages'
import s from '../PacksList.module.css'

import { PackQuestionsItem } from './PackQuestionsItem'

export const PacksQuestion = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.titleLink}>
        <Link to={PATH.PACK_LIST}>Back to Packs List</Link>
      </div>
      <div className={s.titleTable}>Friend’s Pack</div>
      <div className={s.wrapperTable}>
        <PackQuestionsItem />
      </div>
    </div>
  )
}
