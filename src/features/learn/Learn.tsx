import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { BackToPackList } from '../../common/components/BackToPackListButton/BackToPackList'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import SuperRadio from '../../common/components/SuperRadio/SuperRadio'
import { CardType } from '../packsPage/cards/cards-api'
import { setCardGradeTC } from '../packsPage/cards/cards-reducer'

import s from './Learn.module.css'

const button = {
  width: '85%',
  marginTop: '30px',
}

export const Learn = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const packName = useAppSelector(state => state.cards.packName)
  const cardsCount = useAppSelector(state => state.cards.cardsTotalCount)
  const answerArr = [
    { id: '1', value: 'Did not know' },
    { id: '2', value: 'Forgot' },
    { id: '3', value: 'A lot of thought' },
    { id: '4', value: 'Confused' },
    { id: '5', value: 'Knew the answer' },
  ]
  const [value, onChangeOption] = useState(answerArr[2].id)
  const [isShow, setIsShow] = useState<boolean>(false)

  // function arrayRandElement(arr: Array<CardType>) {
  //   var rand = Math.floor(Math.random() * arr.length)
  //
  //   return arr[rand]
  // }
  let [questionIndex, setQuestionIndex] = useState(0)
  const randomCardsArr = cards[questionIndex]

  const onClickHandler = (value: string) => {
    questionIndex < cardsCount
      ? setQuestionIndex(questionIndex + 1)
      : setQuestionIndex((questionIndex = 0))
    setIsShow(false)
    dispatch(setCardGradeTC(value, randomCardsArr._id))
  }

  // const onSumbitHandler = (value: string) => {
  //   console.log(value)
  //   dispatch(setCardGradeTC(value, randomCardsArr._id))
  // }

  return (
    <div>
      <BackToPackList className={'marginLeft'} />
      <h2 className={s.title}>Learn: {packName}</h2>
      <div className={s.wrapperLearn}>
        <div className={s.questionWrapper}>
          <div className={s.titleQuestion}>Question:</div>
          <div className={s.textQuestion}>{randomCardsArr && randomCardsArr.question}</div>
        </div>
        <div className={s.titleQuantityAnswer}>
          Количество попыток ответа:
          <span className={s.quantityAnswer}>{randomCardsArr && randomCardsArr.shots}</span>
        </div>
        <div className={s.wrapperButton}>
          <ClassicButton title={'Show answer'} sx={button} onClick={() => setIsShow(true)} />
        </div>
        {isShow ? (
          <>
            <div className={s.answerWrapper}>
              <div className={s.titleQuestion}>Answer:</div>
              <div className={s.textQuestion}>{randomCardsArr && randomCardsArr.answer}</div>
            </div>
            <div className={s.textRate}>Rate yourself:</div>
            <form
              className={s.form}
              // onSubmit={e => {
              //   e.preventDefault()
              // }}
            >
              <div className={s.wrapperSuperRadio}>
                <SuperRadio
                  name={'radio'}
                  options={answerArr}
                  value={value}
                  onChangeOption={onChangeOption}
                />
              </div>
              <div className={s.wrapperButtonNext}>
                <ClassicButton title={'Next'} sx={button} onClick={() => onClickHandler(value)} />
              </div>
            </form>
          </>
        ) : (
          ' '
        )}
      </div>
    </div>
  )
}
