import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { BackToPackList } from '../../common/components/BackToPackListButton/BackToPackList'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import SuperRadio from '../../common/components/SuperRadio/SuperRadio'

import s from './Learn.module.css'

const button = {
  width: '85%',
  marginTop: '30px',
}

export const Learn = () => {
  const dispatch = useAppDispatch()
  const isLogged = useAppSelector<boolean>(state => state.auth.isLogged)
  const answerArr = [
    { id: '0', value: 'Did not know' },
    { id: '1', value: 'Forgot' },
    { id: '2', value: 'A lot of thought' },
    { id: '3', value: 'Confused' },
    { id: '4', value: 'Knew the answer' },
  ]
  const [value, onChangeOption] = useState(answerArr[1].id)
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <div>
      <BackToPackList className={'marginLeft'} />
      <h2 className={s.title}>Learn `Pack name`</h2>
      <div className={s.wrapperLearn}>
        <div className={s.questionWrapper}>
          <div className={s.titleQuestion}>Question:</div>
          <div className={s.textQuestion}>Lizards</div>
        </div>
        <div className={s.titleQuantityAnswer}>
          Количество попыток ответа: <span className={s.quantityAnswer}>10</span>
        </div>
        <div className={s.wrapperButton}>
          <ClassicButton title={'Show answer'} sx={button} onClick={() => setIsShow(!isShow)} />
        </div>
        {isShow ? (
          <>
            <div className={s.answerWrapper}>
              <div className={s.titleQuestion}>Answer:</div>
              <div className={s.textQuestion}>Lizards</div>
            </div>
            <div className={s.textRate}>Rate yourself:</div>
            <form className={s.form}>
              <div className={s.wrapperSuperRadio}>
                <SuperRadio
                  name={'radio'}
                  options={answerArr}
                  value={value}
                  onChangeOption={onChangeOption}
                />
              </div>
              <div className={s.wrapperButtonNext}>
                <ClassicButton title={'Next'} sx={button} />
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
