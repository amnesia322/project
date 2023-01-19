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
import { findSubstr } from '../../../common/utils/findSubscr'
import { setPackCards } from '../cards/cards-reducer'

import s from './PackItem.module.css'
import { PackItemActions } from './packItremActions/PackItemActions'

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
      item.user_name,
      item._id,
      item.user_id
    )
  )

  const getQuestions = (id: string) => {
    dispatch(setPackCards(id))
  }

  const styleForRow = {}

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={styleForRow}>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Cards</StyledTableCell>
              <StyledTableCell align="center">Last Update</StyledTableCell>
              <StyledTableCell align="center">Create by</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" onClick={() => getQuestions(row.id)}>
                  <Link className={s.link} to={PATH.CARDS_LIST}>
                    {row.name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">{row.cardsCount}</StyledTableCell>
                <StyledTableCell align="center">{row.lastUpdate}</StyledTableCell>
                <StyledTableCell align="center">{row.createBy}</StyledTableCell>
                <StyledTableCell align="center">
                  <PackItemActions userId={row.userId} packId={row.id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
