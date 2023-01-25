import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { BackToPackList } from '../../common/components/BackToPackListButton/BackToPackList'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import SuperRadio from '../../common/components/SuperRadio/SuperRadio'
import { getCard } from '../../common/utils/getCard'
import { CardType } from '../packsPage/cards/cards-api'
import { setCardGradeTC } from '../packsPage/cards/cards-reducer'

import s from './Learn.module.css'

const button = {
  width: '85%',
  marginTop: '30px',
}

const answerArr = [
  { id: '1', value: 'Did not know' },
  { id: '2', value: 'Forgot' },
  { id: '3', value: 'A lot of thought' },
  { id: '4', value: 'Confused' },
  { id: '5', value: 'Knew the answer' },
]

export const Learn = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const packName = useAppSelector(state => state.cards.packName)

  let [value, onChangeOption] = useState<string>('0')
  const [isShow, setIsShow] = useState<boolean>(false)
  const [cardAnsfer, setCardAncfer] = useState<CardType>()

  useEffect(() => {
    setCardAncfer(getCard(cards))
  }, [cards])

  useEffect(() => {
    onChangeOption('0')
  }, [isShow])

  const onClickHandler = (grade: string) => {
    setIsShow(false)
    dispatch(setCardGradeTC(grade, cardAnsfer!._id))
  }

  return (
    <div>
      <BackToPackList className={'marginLeft'} />
      <h2 className={s.title}>Learn: {packName}</h2>
      <div className={s.wrapperLearn}>
        <div className={s.questionWrapper}>
          <div className={s.titleQuestion}>Question:</div>
          <div className={s.textQuestion}>{cardAnsfer && cardAnsfer.question}</div>
        </div>
        <div className={s.titleQuantityAnswer}>
          Количество попыток ответа:
          <span className={s.quantityAnswer}>{cardAnsfer && cardAnsfer.shots}</span>
        </div>
        <div className={s.wrapperButton}>
          <ClassicButton title={'Show answer'} sx={button} onClick={() => setIsShow(true)} />
        </div>
        {isShow ? (
          <>
            <div className={s.answerWrapper}>
              <div className={s.titleQuestion}>Answer:</div>
              <div className={s.textQuestion}>{cardAnsfer && cardAnsfer.answer}</div>
            </div>
            <div className={s.textRate}>Rate yourself:</div>
            <div className={s.form}>
              <div className={s.wrapperSuperRadio}>
                <SuperRadio
                  name={'radio'}
                  options={answerArr}
                  value={value}
                  onChangeOption={onChangeOption}
                />
              </div>
              <div className={s.wrapperButtonNext}>
                <ClassicButton
                  title={'Next'}
                  sx={button}
                  onClick={() => onClickHandler(value)}
                  disabled={value === '0'}
                />
              </div>
            </div>
          </>
        ) : (
          ' '
        )}
      </div>
    </div>
  )
}
