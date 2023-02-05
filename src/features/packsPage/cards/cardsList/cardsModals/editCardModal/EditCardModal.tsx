import React, { ChangeEvent, memo, ReactNode, useCallback, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

import { useAppDispatch } from '../../../../../../app/store'
import { BasicModal } from '../../../../../../common/components/BasicModal/BasicModal'
import { ClassicButton } from '../../../../../../common/components/ClassicButton/ClassicButton'
import { ClassicFileInput } from '../../../../../../common/components/ClassicFileInput/ClassicFileInput'
import { editCardTitleTC } from '../../../cards-reducer'
import s from '../editCardModal/EditCardModal.module.css'

type PropsType = {
  children?: ReactNode
  cardId: string
  question: string
  answer: string
  questionImg: string | undefined
}

export const EditCardModal = memo(
  ({ children, cardId, question, answer, questionImg }: PropsType) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = useCallback(() => setOpen(false), [])

    const [newQuestion, setNewQuestion] = useState(question)
    const changeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewQuestion(e.currentTarget.value)
    }
    let questionFormat = questionImg ? 'Picture' : 'Text'

    const [newAnswer, setNewAnswer] = useState(answer)
    const changeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewAnswer(e.currentTarget.value)
    }

    const [newQuestionImg, setNewQuestionImg] = useState(questionImg)
    const changeQuestionImg = (file64: string) => {
      setNewQuestionImg(file64)
    }

    const editCardHandler = () => {
      dispatch(
        editCardTitleTC({
          card: {
            _id: cardId,
            question: newQuestion,
            answer: newAnswer,
            questionImg: newQuestionImg,
          },
        })
      )
      setOpen(false)
    }

    return (
      <>
        <div className={s.iconButton} onClick={handleOpen}>
          {children}
        </div>
        <BasicModal title={'Edit card'} open={open} handleClose={handleClose}>
          <FormControl fullWidth>
            {questionFormat === 'Picture' ? (
              <ClassicFileInput
                changeCover={changeQuestionImg}
                cover={newQuestionImg}
                title={'Question'}
              />
            ) : (
              <TextField
                sx={{ marginTop: '22px' }}
                fullWidth={true}
                size="small"
                variant="standard"
                label="Question"
                value={newQuestion}
                onChange={changeQuestionHandler}
                placeholder={'Question'}
              />
            )}
            <TextField
              sx={{ marginTop: '22px' }}
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
  }
)
