import React, { useState } from 'react'

import { TextField, FormControlLabel, Checkbox, FormGroup } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { PATH } from '../../app/Routes/Pages'
import { useAppDispatch, useAppSelector } from '../../app/store'
import SuperButton from '../../common/components/SuperButton/SuperButton'

import s from './ForgotPassword.module.css'

export type FormikValueType = {
  email: string
}

type FormikErrorType = {
  email?: string
}
export const ForgotPassword = () => {
  const validate = (values: FormikValueType) => {
    const errors: FormikErrorType = {}

    if (!values.email) {
      errors.email = 'Required your email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = 'Invalid email address'

    return errors
  }

  const formik = useFormik<FormikValueType>({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: values => {
      // dispatch(LoginTC(values))
      formik.resetForm()
    },
  })

  return (
    <div className={s.wrapperLogin}>
      <h2 className={s.title}>Forgot your password?</h2>
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
        </FormGroup>
        <div className={s.textDescription}>
          {' '}
          Enter your email address and we will send you further instructions
        </div>
        <SuperButton className={s.button} type={'submit'} disabled={!!formik.errors.email}>
          Send Instructions
        </SuperButton>
        <NavLink className={s.navLinkAccount} to={''}>
          Did you remember your password?
        </NavLink>
        <NavLink className={s.underTitle} to={PATH.REGISTER}>
          Try logging in
        </NavLink>
      </form>
    </div>
  )
}
