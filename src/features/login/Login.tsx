import React, { useState } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import {
  FormControl,
  Input,
  InputLabel,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'

import SuperButton from '../../common/components/SuperButton/SuperButton'

import s from './Login.module.css'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const validate = () => {}

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values))
      formik.resetForm()
    },
  })

  return (
    <div className={s.wrapperLogin}>
      <h2 className={s.title}>Sign in</h2>
      <form className={s.form}>
        <FormGroup>
          <TextField
            type="email"
            id="standard-basic"
            label="Email"
            variant="standard"
            margin="normal"
          />
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
            />
          </FormControl>
          <FormControlLabel
            className={s.checkbox}
            label={'Remember me'}
            control={<Checkbox />}
            {...formik.getFieldProps('rememberMe')}
            checked={formik.values.rememberMe}
          />
        </FormGroup>
        <NavLink className={s.navLink} to={''}>
          Forgot Passport?
        </NavLink>
        <SuperButton className={s.button} type={'submit'}>
          Sign In
        </SuperButton>
        <NavLink className={s.navLinkAccount} to={''}>
          Already have an account?
        </NavLink>
        <h3 className={s.underTitle}>Sign in</h3>
      </form>
    </div>
  )
}

export default Login
