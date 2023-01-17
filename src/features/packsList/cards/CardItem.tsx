import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../../app/store'
import { ClassicButton } from '../../../common/components/ClassicButton/ClassicButton'
import s from '../packItem/PackItem.module.css'

import { CardItemActions } from './cardItemActions/PackItemActions'

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

export const CardItem = ({ comparedId }: { comparedId: boolean }) => {
  const cards = useAppSelector(state => state.cards.cards)
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
      {!cards.length && comparedId ? (
        <div className={s.wrapperForTitle}>
          <div className={s.titleForEmptyPack}>
            This pack is empty. Click add new card to fill this pack
          </div>
          <ClassicButton title={'Add new card'} />
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
                {comparedId && <StyledTableCell align="right">Actions</StyledTableCell>}
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
                  {comparedId && (
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
