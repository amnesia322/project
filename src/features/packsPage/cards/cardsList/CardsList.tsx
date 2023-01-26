import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { Captions } from '../../../../common/components/Captions/Captions'
import { ClassicButton } from '../../../../common/components/ClassicButton/ClassicButton'
import { cardsCaptions } from '../../../../common/constants/captionsArray'
import { findSubstr } from '../../../../common/utils/findSubscr'
import s from '../../packsList/PacksList.module.css'
import { setCardsPerPage } from '../cards-reducer'

import { CardItemActions } from './cardItemActions/CardItemActions'
import { AddCardModal } from './cardsModals/addCardModal/AddCardModal'
import { CardsRating } from './cardsRating/CardsRating'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: '#000000',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const CardsList = ({ isMyId }: CardItemPropsType) => {
  const cards = useAppSelector(state => state.cards.cards)
  const cardsPack_id = useAppSelector(state => state.cards.queryParams.cardsPack_id)
  const dispatch = useAppDispatch()
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount)
  let cardsCountInPage = 5

  useEffect(() => {
    dispatch(dispatch(setCardsPerPage(cardsCountInPage)))
  }, [])

  const createData = (
    questions: string,
    answer: string,
    lastUpdate: string,
    grade: number,
    id: string
  ) => {
    return { questions, answer, lastUpdate, grade, id }
  }

  const rows = cards.map(item =>
    createData(item.question, item.answer, findSubstr(item.updated), item.grade, item._id)
  )

  return (
    <div>
      {!totalCount ? (
        <div className={s.wrapperForTitle}>
          <div className={s.titleForEmptyPack}>This pack is empty or change search parameters </div>
          {isMyId && (
            <AddCardModal cardsPack_id={cardsPack_id}>
              <ClassicButton title={'Add new card'} />
            </AddCardModal>
          )}
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {/*<StyledTableCell>Question</StyledTableCell>
                <StyledTableCell align="center">Answer</StyledTableCell>
                <StyledTableCell align="center">Last Update</StyledTableCell>
                <StyledTableCell align="center">Grade</StyledTableCell>*/}
                <Captions captions={cardsCaptions} isThisPlaceCards={true} />
                {isMyId && <StyledTableCell align="center">Actions</StyledTableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.questions}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.answer}</StyledTableCell>
                  <StyledTableCell align="center">{row.lastUpdate}</StyledTableCell>
                  <StyledTableCell align="center">
                    <CardsRating grade={row.grade} />
                  </StyledTableCell>
                  {isMyId && (
                    <StyledTableCell align="center">
                      <CardItemActions
                        cardId={row.id}
                        cardQuestion={row.questions}
                        cardAnswer={row.answer}
                      />
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

type CardItemPropsType = {
  isMyId: boolean
  cardsCount?: number
}
