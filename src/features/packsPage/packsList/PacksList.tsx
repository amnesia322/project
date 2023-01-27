import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { Captions } from '../../../common/components/Captions/Captions'
import { packsCaptions } from '../../../common/constants/captionsArray'
import { StyledTableCell, StyledTableRow } from '../../../common/utils/css/StyledTable'
import { findSubstr } from '../../../common/utils/findSubscr'
import { setPackCards } from '../cards/cards-reducer'

import { PackItemActions } from './packItremActions/PackItemActions'
import s from './PacksList.module.css'

export const PacksList = () => {
  const packs = useAppSelector(state => state.packs.cardPacks)
  const dispatch = useAppDispatch()

  const createData = (
    name: string,
    cardsCount: number,
    lastUpdate: string,
    createBy: string,
    id: string,
    userId: string,
    isPrivate: boolean
  ) => {
    return { name, cardsCount, lastUpdate, createBy, id, userId, isPrivate }
  }

  const rows = packs.map(item =>
    createData(
      item.name,
      item.cardsCount,
      findSubstr(item.updated),
      item.user_name,
      item._id,
      item.user_id,
      item.private
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
              <Captions captions={packsCaptions} isThisPlaceCards={false} />
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row" onClick={() => getQuestions(row.id)}>
                  <Link className={s.link} to={`/cards_list/${row.id}`}>
                    {row.name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">{row.cardsCount}</StyledTableCell>
                <StyledTableCell align="center">{row.lastUpdate}</StyledTableCell>
                <StyledTableCell align="center">{row.createBy}</StyledTableCell>
                <StyledTableCell align="center">
                  <PackItemActions
                    userId={row.userId}
                    packId={row.id}
                    packName={row.name}
                    isPrivate={row.isPrivate}
                    cardsCount={row.cardsCount}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
