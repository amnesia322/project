import React from 'react'

import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
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
import { setPackCards } from '../../cards/cards-reducer'

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
    isPrivate: boolean,
    deckCover: string
  ) => {
    return { name, cardsCount, lastUpdate, createBy, id, userId, isPrivate, deckCover }
  }

  const rows = packs.map(item =>
    createData(
      item.name,
      item.cardsCount,
      findSubstr(item.updated),
      item.user_name,
      item._id,
      item.user_id,
      item.private,
      item.deckCover
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
                    {row.deckCover === 'url or base64' ||
                    !row.deckCover ||
                    row.deckCover === 'startValue' ? (
                      <AutoStoriesOutlinedIcon
                        sx={{ width: '80px', height: '60px', marginRight: '16px' }}
                        fontSize={'large'}
                        color={'action'}
                      />
                    ) : (
                      <img className={s.cover} src={row.deckCover} alt={'deckCover'} />
                    )}
                    <span className={s.packName}>{row.name}</span>
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
                    deckCover={row.deckCover}
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
