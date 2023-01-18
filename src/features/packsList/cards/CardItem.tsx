import React from 'react'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ClassicButton } from '../../../common/components/ClassicButton/ClassicButton'
import { findSubstr } from '../../../common/utils/findSubscr'
import s from '../packItem/PackItem.module.css'

import { CardItemActions } from './cardItemActions/CardItemActions'
import { addCardTC } from './cards-reducer'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

export const CardItem = ({ isMyId }: { isMyId: boolean }) => {
  const cards = useAppSelector(state => state.cards.cards)
  const cardsPack_id = useAppSelector(state => state.cards.queryParams.cardsPack_id)
  const dispatch = useAppDispatch()
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

  const addCardHandler = () => {
    dispatch(addCardTC({ card: { cardsPack_id } }))
  }

  return (
    <div>
      {!cards.length ? (
        <div className={s.wrapperForTitle}>
          <div className={s.titleForEmptyPack}>This pack is empty.</div>
          {!!isMyId && <ClassicButton title={'Add new card'} onClick={addCardHandler} />}
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Question</StyledTableCell>
                <StyledTableCell align="left">Answer</StyledTableCell>
                <StyledTableCell align="right">Last Update</StyledTableCell>
                <StyledTableCell align="right">Grade</StyledTableCell>
                {isMyId && <StyledTableCell align="right">Actions</StyledTableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.questions}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.answer}</StyledTableCell>
                  <StyledTableCell align="right">{row.lastUpdate}</StyledTableCell>
                  <StyledTableCell align="right">{row.grade}</StyledTableCell>
                  {isMyId && (
                    <StyledTableCell align="right">
                      <CardItemActions />
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
