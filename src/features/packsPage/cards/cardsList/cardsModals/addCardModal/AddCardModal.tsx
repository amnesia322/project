import React, { ChangeEvent, memo, ReactNode, useCallback, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

import { useAppDispatch } from '../../../../../../app/store'
import { BasicModal } from '../../../../../../common/components/BasicModal/BasicModal'
import { ClassicButton } from '../../../../../../common/components/ClassicButton/ClassicButton'
import { ClassicSelect } from '../../../../../../common/components/ClassicSelect/CalssicSelect'
import { addCardTC } from '../../../cards-reducer'
import s from '../addCardModal/AddCardModal.module.css'

type PropsType = {
  children?: ReactNode
  cardsPack_id: string
}

export const AddCardModal = memo(({ children, cardsPack_id }: PropsType) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = useCallback(() => setOpen(false), [])

  const [question, setQuestion] = useState('')
  const setNewQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }

  const [questionFormat, setQuestionFormat] = useState('Text')
  const changeQuestionFormatHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionFormat(e.currentTarget.value)
  }

  const [answer, setAnswer] = useState('')
  const setNewAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value)
  }

  const addCardHandler = () => {
    dispatch(addCardTC({ card: { cardsPack_id, question, answer } }))
    setOpen(false)
  }

  return (
    <>
      <div className={s.iconButton} onClick={handleOpen}>
        {children}
      </div>
      <BasicModal title={'Add new card'} open={open} handleClose={handleClose}>
        <FormControl fullWidth>
          <ClassicSelect
            value={questionFormat}
            title={'Choose a question format'}
            handleChange={changeQuestionFormatHandler}
          />
          <TextField
            sx={{ marginTop: '22px' }}
            fullWidth={true}
            size="small"
            variant="standard"
            label="Question"
            value={question}
            onChange={setNewQuestion}
            placeholder={'Enter your question'}
          />
          <TextField
            sx={{ marginTop: '22px' }}
            fullWidth={true}
            size="small"
            variant="standard"
            label="Answer"
            value={answer}
            onChange={setNewAnswer}
            placeholder={'Enter your answer'}
          />
        </FormControl>
        <div className={s.buttonsContainer}>
          <ClassicButton title={'Cancel'} onClick={handleClose} color={'inherit'} />
          <ClassicButton title={'Save'} onClick={addCardHandler} />
        </div>
      </BasicModal>
    </>
  )
})
