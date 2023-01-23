import React, { ChangeEvent, memo, ReactNode, useCallback, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

import { useAppDispatch } from '../../../../../../app/store'
import { BasicModal } from '../../../../../../common/components/BasicModal/BasicModal'
import { ClassicButton } from '../../../../../../common/components/ClassicButton/ClassicButton'
import { ClassicSelect } from '../../../../../../common/components/ClassicSelect/CalssicSelect'
import { editCardTitleTC } from '../../../cards-reducer'
import s from '../editCardModal/EditCardModal.module.css'

type PropsType = {
  children?: ReactNode
  cardId: string
  question: string
  answer: string
}

export const EditCardModal = memo(({ children, cardId, question, answer }: PropsType) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = useCallback(() => setOpen(false), [])

  const [newQuestion, setNewQuestion] = useState(question)
  const changeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewQuestion(e.currentTarget.value)
  }

  const [questionFormat, setQuestionFormat] = useState('Text')
  const changeQuestionFormatHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionFormat(e.currentTarget.value)
  }

  const [newAnswer, setNewAnswer] = useState(answer)
  const changeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAnswer(e.currentTarget.value)
  }

  const editCardHandler = () => {
    dispatch(editCardTitleTC({ card: { _id: cardId, question: newQuestion, answer: newAnswer } }))
    setOpen(false)
  }

  return (
    <>
      <div className={s.iconButton} onClick={handleOpen}>
        {children}
      </div>
      <BasicModal title={'Edit card'} open={open} handleClose={handleClose}>
        <FormControl fullWidth>
          <ClassicSelect
            value={questionFormat}
            title={'Choose a question format'}
            handleChange={changeQuestionFormatHandler}
          />
          <TextField
            className={s.container}
            fullWidth={true}
            size="small"
            variant="standard"
            label="Question"
            value={newQuestion}
            onChange={changeQuestionHandler}
            placeholder={'Question'}
          />
          <TextField
            className={s.container}
            fullWidth={true}
            size="small"
            variant="standard"
            label="Answer"
            value={newAnswer}
            onChange={changeAnswerHandler}
            placeholder={'Answer'}
          />
        </FormControl>
        <div className={s.buttonsContainer}>
          <ClassicButton title={'Cancel'} onClick={handleClose} color={'inherit'} />
          <ClassicButton title={'Save'} onClick={editCardHandler} />
        </div>
      </BasicModal>
    </>
  )
})
