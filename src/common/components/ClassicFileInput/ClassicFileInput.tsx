import React, { ChangeEvent, useRef } from 'react'

import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'

import s from './ClassicFileInput.module.css'

type PropsType = {
  changeCover: (file64: string) => void
  cover?: string
  title?: string
}
export const ClassicFileInput = (props: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)

      if (file.size < 4000000) {
        const reader = new FileReader()

        reader.onloadend = () => {
          let file64 = reader.result as string

          if (file64) {
            props.changeCover(file64)
          }
        }
        reader.readAsDataURL(file)
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  return (
    <label>
      <div className={s.titleBlock}>
        <span className={s.title}>{props.title}</span>
        <button className={s.button} onClick={selectFileHandler}>
          Change cover
        </button>
      </div>
      <input type="file" ref={inputRef} onChange={uploadHandler} style={{ display: 'none' }} />
      <div className={s.coverBlock}>
        {props.cover ? (
          <img alt={'cover'} src={props.cover} className={s.cover} />
        ) : (
          <AutoStoriesOutlinedIcon
            sx={{ width: '347px', height: '119px' }}
            fontSize={'large'}
            color={'action'}
          />
        )}
      </div>
    </label>
  )
}
