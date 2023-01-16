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
import { setCardsTC } from '../cards/cards-reducer'

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

const findSubstr = (str: string) => {
  const index = str.indexOf('T')

  return str.slice(0, index)
}

export const PackItem = () => {
  const users = useAppSelector(state => state.packs.cardPacks)
  const myId = useAppSelector(state => state.profile.user._id)
  const dispatch = useAppDispatch()
  const createData = (
    name: string,
    cardsCount: number,
    lastUpdate: string,
    createBy: string,
    // actions: number
    id: string
  ) => {
    return { name, cardsCount, lastUpdate, createBy, id }
  }

  const rows = users.map(item =>
    createData(
      item.name,
      item.cardsCount,
      findSubstr(item.updated),
      findSubstr(item.created),
      item._id
    )
  )

  const getQuestions = (id: string) => {
    dispatch(setCardsTC(id))
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          {users.length > 0 ? (
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Cards</StyledTableCell>
                <StyledTableCell align="right">Last Update</StyledTableCell>
                <StyledTableCell align="right">Create by</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
          ) : (
            <TableBody>
              <TableRow>
                <StyledTableCell>
                  This pack is empty. Click add new card to fill this pack{' '}
                </StyledTableCell>
              </TableRow>
            </TableBody>
          )}
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
                  <PackItemActions id={row.id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
