import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'

import { PATH } from '../../app/Routes/Pages'
import { useAppDispatch, useAppSelector } from '../../app/store'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import s from '../NewPass/NewPass.module.css'

import { setNewPassTC } from './newPass-reducer'

const NewPass = () => {
  const isNewPassSet = useAppSelector(state => state.newPass.isNewPassSet)
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const { token } = useParams()

  console.log(token)
  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.password) {
        errors.password = 'Password required'
      } else if (values.password.length < 3) {
        errors.password = 'Password must be more than 7 characters...'
      }

      return errors
    },
    onSubmit: values => {
      if (values.password && token) {
        const payload = { password: values.password, resetPasswordToken: token }

        dispatch(setNewPassTC(payload))
      }
    },
  })

  if (isNewPassSet) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.newPassPage}>
      <div className={s.newPassContainer}>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <FormControl sx={{ width: '347px' }}>
            <FormGroup>
              <h2 className={s.title}>Create new password</h2>
              <FormControl margin="normal" fullWidth={true}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: 'red' }}>{formik.errors.password} </div>
                ) : null}
              </FormControl>
              <div className={s.text}>
                Create new password and we will send you further instructions to email
              </div>
              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={{
                  marginTop: '60px',
                  borderRadius: '30px',
                  fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '20px',
                  textTransform: 'none',
                }}
              >
                Create new password
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </div>
    </div>
  )
}

type FormikErrorType = {
  password?: string
}

export default NewPass
