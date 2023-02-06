import React, { useState } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { PATH } from '../../../app/Routes/Pages'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ClassicButton } from '../../../common/components/ClassicButton/ClassicButton'
import { loginTC } from '../auth-reducer'

import s from './Login.module.css'

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const dispatch = useAppDispatch()
  const isLogged = useAppSelector<boolean>(state => state.auth.isLogged)
  const button = {
    width: '100%',
    marginTop: '40px',
  }
  const validate = (values: FormikValueType) => {
    const errors: FormikErrorType = {}

    if (!values.email) {
      errors.email = 'Required your email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = 'Invalid email address'

    if (values.password && values.password.length < 7) {
      errors.password = 'Required password more 7 letters'
    }

    return errors
  }

  const formik = useFormik<FormikValueType>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate,
    onSubmit: values => {
      dispatch(loginTC(values))
    },
  })

  if (isLogged) {
    return <Navigate to={PATH.PACK_LIST} />
  }

  return (
    <div className={s.wrapperLogin}>
      <h2 className={s.title}>Sign in</h2>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <FormGroup>
          <TextField
            type="email"
            id="standard-basic"
            label="Email"
            variant="standard"
            margin="normal"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          ) : null}
          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            ) : null}
          </FormControl>
          <FormControlLabel
            className={s.checkbox}
            label={'Remember Me'}
            control={<Checkbox />}
            {...formik.getFieldProps('rememberMe')}
            checked={formik.values.rememberMe}
          />
        </FormGroup>
        <NavLink className={s.navLink} to={PATH.PASS_RECOVERY}>
          Forgot Passport?
        </NavLink>
        <ClassicButton title={'Sign In'} sx={button} />
        <NavLink className={s.navLinkAccount} to={''}>
          Don’t have an account?
        </NavLink>
        <NavLink className={s.underTitle} to={PATH.REGISTER}>
          Sign Up
        </NavLink>
      </form>
    </div>
  )
}

export type FormikValueType = {
  email: string
  password: string
  rememberMe: boolean
}
type FormikErrorType = Partial<FormikValueType>
