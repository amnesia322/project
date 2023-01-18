import React, { useState } from 'react'

import SuperButton from '../../../common/components/SuperButton/SuperButton'

export const PacsCardsButton = () => {
  const [onOff, setOnOff] = useState(false)

  const onStyle = {
    backgroundColor: onOff ? '#1976d2' : '#EFEFEF',
    color: !onOff ? 'black' : 'white',
  }
  const offStyle = {
    backgroundColor: onOff ? '#EFEFEF' : '#1976d2',
    color: onOff ? 'black' : 'white',
  }

  return (
    <div>
      <SuperButton
        onClick={() => {
          setOnOff(true)
        }}
        style={onStyle}
      >
        My
      </SuperButton>
      <SuperButton
        onClick={() => {
          setOnOff(false)
        }}
        style={offStyle}
      >
        All
      </SuperButton>
    </div>
  )
}
