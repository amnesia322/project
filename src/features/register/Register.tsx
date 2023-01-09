import React from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { PATH } from '../../app/Routes/Pages'
import { useAppDispatch, useAppSelector } from '../../app/store'

import { registerTC } from './register-reducer'
import s from './Register.module.css'

export const Register = () => {
  const isReg = useAppSelector(state => state.register.isRegister)
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Password required'
      } else if (values.password.length < 3) {
        errors.password = 'Password must be more than 7 characters...'
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords must match'
      }

      return errors
    },
    onSubmit: values => {
      //dispatch(loginTC(values))
      const payload = { email: values.email, password: values.password }

      dispatch(registerTC(payload))
      formik.resetForm()
    },
  })

  if (isReg) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.registerPage}>
      <div className={s.registerContainer}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormGroup>
              <h2 className={s.registerTitle}>Sign Up</h2>
              <FormControl margin="normal" fullWidth={true}>
                <InputLabel htmlFor="register-email">Email</InputLabel>
                <Input id="register-email" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: 'red' }}>{formik.errors.email} </div>
                ) : null}
              </FormControl>
              <FormControl margin="normal" fullWidth={true}>
                <InputLabel htmlFor="register-password">Password</InputLabel>
                <Input
                  id="register-password"
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
              <FormControl margin="normal" fullWidth={true}>
                <InputLabel htmlFor="register-password-confirm">Password</InputLabel>
                <Input
                  id="register-password-confirm"
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('confirmPassword')}
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
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div style={{ color: 'red' }}>{formik.errors.confirmPassword} </div>
                ) : null}
              </FormControl>
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
                Sign Up
              </Button>
            </FormGroup>
            <FormLabel>
              <p className={s.registerDescription}>Already have an account?</p>
              <a href={PATH.LOGIN} target={'_blank'} rel="noreferrer" className={s.registerLink}>
                Sign In
              </a>
            </FormLabel>
          </FormControl>
        </form>
      </div>
    </div>
  )
}

type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}
