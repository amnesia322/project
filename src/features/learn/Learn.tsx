import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { BackToPackList } from '../../common/components/BackToPackListButton/BackToPackList'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import { SuperRadio } from '../../common/components/SuperRadio/SuperRadio'
import { answerArr } from '../../common/constants/answerArr'
import { buttonLearning } from '../../common/utils/css/ButtonStyle'
import { getCard } from '../../common/utils/getCard'
import { CardType } from '../packsPage/cards/cards-api'
import { setCardGradeTC, setCardsPerPage, setCardsTC } from '../packsPage/cards/cards-reducer'

import s from './Learn.module.css'

export const Learn = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const packName = useAppSelector(state => state.cards.packName)
  const cardsCount = useAppSelector(state => state.cards.cardsTotalCount)

  let [value, onChangeOption] = useState<string>('0')
  const [isShow, setIsShow] = useState<boolean>(false)
  const [cardAnswer, setCardAnswer] = useState<CardType>()
  const { id } = useParams()

  useEffect(() => {
    dispatch(setCardsPerPage(cardsCount))
    id && dispatch(setCardsTC(id))
  }, [])

  useEffect(() => {
    setCardAnswer(getCard(cards))
  }, [cards])

  useEffect(() => {
    onChangeOption('0')
  }, [isShow])

  const onClickHandler = (grade: string) => {
    setIsShow(false)
    dispatch(setCardGradeTC(grade, cardAnswer!._id))
  }

  return (
    <div>
      <BackToPackList className={'marginLeft'} />
      <h2 className={s.title}>Learn: {packName}</h2>
      <div className={s.wrapperLearn}>
        <div className={s.questionWrapper}>
          <div className={s.titleQuestion}>Question:</div>
          <div className={s.textQuestion}>
            {cardAnswer &&
              (cardAnswer.questionImg ? (
                <img className={s.cover} src={cardAnswer.questionImg} alt="questionImg" />
              ) : (
                cardAnswer.question
              ))}
          </div>
        </div>
        <div className={s.titleQuantityAnswer}>
          Количество попыток ответа:
          <span className={s.quantityAnswer}>{cardAnswer && cardAnswer.shots}</span>
        </div>
        <div className={s.wrapperButton}>
          <ClassicButton
            title={'Show answer'}
            sx={buttonLearning}
            onClick={() => setIsShow(true)}
            disabled={isShow}
          />
        </div>
        {isShow ? (
          <>
            <div className={s.answerWrapper}>
              <div className={s.titleQuestion}>Answer:</div>
              <div className={s.textQuestion}>{cardAnswer && cardAnswer.answer}</div>
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
                  sx={buttonLearning}
                  onClick={() => onClickHandler(value)}
                  disabled={value === '0'}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
