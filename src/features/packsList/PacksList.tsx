import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import { PaginationComponent } from '../../common/components/Pagination/PaginationComponent'
import SuperInputText from '../../common/components/SuperInputText/SuperInputText'

import { PacsCardsButton } from './packCardsButtons/PackCardsButton'
import { PackCardsDoubleRange } from './packCardsDoubleRange/PackCardsDubleRange'
import { PackItem } from './packItem/PackItem'
import { addPackTC, setPacksTC } from './packs-reducer'
import s from './PacksList.module.css'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector(state => state.packs.queryParams)
  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.queryParams.pageCount)

  const onClickHandler = () => {
    dispatch(addPackTC({ cardsPack: { name: '!The Best team pack!' } }))
  }

  useEffect(() => {
    dispatch(setPacksTC())
  }, [page, query, pageCount, query.user_id])

  return (
    <div className={s.wrapper}>
      <div className={s.wrapperButton}>
        {totalCount ? (
          <>
            <div className={s.titleTable}>Packs list</div>
            <ClassicButton title={'Add new pack'} onClick={onClickHandler} />
          </>
        ) : (
          <div>
            <div className={s.titleTable}>Is not Packs here</div>
          </div>
        )}
      </div>
      <div className={s.wrapperTable}></div>
      <div className={s.wrapperForHeaderTable}>
        <div>
          <span className={s.titleButton}> Search</span>
          <SuperInputText className={s.input} placeholder={'Provide your text'} />
        </div>
        <div className={s.wrapperFilterButton}>
          <span className={s.titleButton}> Show packs cards</span>
          <div>
            <PacsCardsButton />
          </div>
        </div>
        <div className={s.wrapperForRange}>
          <span className={s.titleButton}> Number of Cards</span>
          <PackCardsDoubleRange />
        </div>
      </div>
      <PackItem />
      <PaginationComponent
        pageCount={pageCount}
        totalCount={totalCount}
        currentPage={page}
        isThisPlaceCards={false}
      />
    </div>
  )
}
