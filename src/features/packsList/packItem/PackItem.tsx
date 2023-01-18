import React from 'react'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Link } from 'react-router-dom'

import { PATH } from '../../../app/Routes/Pages'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ClassicButton } from '../../../common/components/ClassicButton/ClassicButton'
import { setCardsTC } from '../cards/cards-reducer'
import { findSubstr } from '../../../common/utils/findSubscr'

import s from './PackItem.module.css'
import { PackItemActions } from './packItremActions/PackItemActions'
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

export const PackItem = () => {
  const packs = useAppSelector(state => state.packs.cardPacks)
  const dispatch = useAppDispatch()

  const createData = (
    name: string,
    cardsCount: number,
    lastUpdate: string,
    createBy: string,
    id: string,
    userId: string
  ) => {
    return { name, cardsCount, lastUpdate, createBy, id, userId }
  }

  const rows = packs.map(item =>
    createData(
      item.name,
      item.cardsCount,
      findSubstr(item.updated),
      findSubstr(item.created),
      item._id,
      item.user_id
    )
  )

  const getQuestions = (id: string) => {
    dispatch(setCardsTC(id))
  }

  return (
    <div>
      {packs.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Cards</StyledTableCell>
                <StyledTableCell align="right">Last Update</StyledTableCell>
                <StyledTableCell align="right">Create by</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" onClick={() => getQuestions(row.id)}>
                    <Link to={PATH.CARDS_LIST}> {row.name} </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.cardsCount}</StyledTableCell>
                  <StyledTableCell align="right">{row.lastUpdate}</StyledTableCell>
                  <StyledTableCell align="right">{row.createBy}</StyledTableCell>
                  <StyledTableCell align="right">
                    <PackItemActions userId={row.userId} packId={row.id} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className={s.wrapperForTitle}>
          <div className={s.titleForEmptyPack}>This pack is empty. Click add new card</div>
          <ClassicButton title={'Add new pack'} />
        </div>
      )}
    </div>
  )
}
