import React from 'react'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Button } from '@mui/material'

import { BackToPackList } from '../../common/components/BackToPackListButton/BackToPackList'

import s from './Learn.module.css'

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
  },
  questionWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontStyle: 'normal',
    lineHeight: '24px',
  },
  titleQuestion: {
    paddingRight: '10px',
    fontWeight: 'bold',
  },
  textQuestion: {
    fontWeight: 'normal',
  },
  titleQuantityAnswer: {
    fontSize: '14px',
    fontWeight: 'normal',
    opacity: '0.5',
    paddingLeft: '15px',
  },
  button: {
    width: '300px',
    borderRadius: '30px',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    textTransform: 'none',
    backgroundColor: '#366eff',
  },
})

export function LearnMUI() {
  const classes = useStyles()

  return (
    <div>
      <BackToPackList className={'marginLeft'} />
      <div className={s.wrapper}>
        <h2 className={s.title}>Learn `Pack name`</h2>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent className={classes.questionWrapper}>
              <Typography className={classes.titleQuestion}>Question:</Typography>
              <Typography className={classes.textQuestion}>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <Typography className={classes.titleQuantityAnswer}>
            Количество попыток ответа:
          </Typography>
          <CardActions>
            <Button variant={'contained'} color={'primary'}>
              ff
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  )
}
