import React from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  FormControl,
  FormGroup,
  FormLabel,
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
import { registerTC } from '../auth-reducer'

import s from './Register.module.css'

export const Register = () => {
  const isReg = useAppSelector(state => state.auth.isRegister)
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const formik = useFormik<RegisterParamsType>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      const errors: FormikErrorsType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Password required'
      } else if (values.password.length < 7) {
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
      const payload = { email: values.email, password: values.password }

      dispatch(registerTC(payload))
      formik.resetForm()
    },
  })

  if (isReg) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.registerContainer}>
      <h2 className={s.registerTitle}>Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <FormControl sx={{ width: '347px' }}>
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
              <div style={{ color: 'red' }}>{formik.errors.email} </div>
            ) : null}
            <FormControl variant="standard">
              <InputLabel htmlFor="register-password">Password</InputLabel>
              <Input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
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
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password} </div>
              ) : null}
            </FormControl>
            <FormControl variant="standard" sx={{ marginBottom: '60px' }}>
              <InputLabel htmlFor="register-password-confirm">Confirm password</InputLabel>
              <Input
                id="register-password-confirm"
                type={showPassword ? 'text' : 'password'}
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
                {...formik.getFieldProps('confirmPassword')}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div style={{ color: 'red' }}>{formik.errors.confirmPassword} </div>
              ) : null}
            </FormControl>
            <ClassicButton title="Sign Up" />
          </FormGroup>
          <FormLabel>
            <p className={s.registerDescription}>Already have an account?</p>
            <NavLink to={PATH.LOGIN} rel="noreferrer" className={s.registerLink}>
              Sign In
            </NavLink>
          </FormLabel>
        </FormControl>
      </form>
    </div>
  )
}

type RegisterParamsType = {
  email: string
  password: string
  confirmPassword: string
}

type FormikErrorsType = {
  email?: string
  password?: string
  confirmPassword?: string
}
