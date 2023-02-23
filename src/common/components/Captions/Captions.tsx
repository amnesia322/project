import React, { useCallback } from 'react'

import { useAppDispatch } from '../../../app/store'
import { setSortCards } from '../../../features/cards/cards-reducer'
import { setSortPacks } from '../../../features/packs/packs-reducer'
import { sortingCardsMethods, sortingPacksMethods } from '../../constants/sortingMethods'

import { Caption } from './Caption'

export const Captions = ({ captions, isThisPlaceCards }: CaptionsPropsType) => {
  const dispatch = useAppDispatch()

  const sortHandler = useCallback(
    (whatWeSort: string, isArrowDown: boolean) => {
      if (whatWeSort === 'Name') {
        if (isArrowDown) {
          dispatch(setSortPacks({ sortPacks: sortingPacksMethods.desName }))
        } else if (!isArrowDown) {
          dispatch(setSortPacks({ sortPacks: sortingPacksMethods.ascName }))
        }
      }
      if (whatWeSort === 'Cards') {
        isArrowDown
          ? dispatch(setSortPacks({ sortPacks: sortingPacksMethods.desCardsCount }))
          : dispatch(setSortPacks({ sortPacks: sortingPacksMethods.ascCardsCount }))
      }
      if (whatWeSort === 'Last Updated') {
        if (isArrowDown) {
          if (!isThisPlaceCards)
            dispatch(setSortPacks({ sortPacks: sortingPacksMethods.desUpdate }))
          if (isThisPlaceCards) dispatch(setSortCards({ sortCards: sortingCardsMethods.desUpdate }))
        } else if (!isArrowDown) {
          if (!isThisPlaceCards)
            dispatch(setSortPacks({ sortPacks: sortingPacksMethods.ascUpdate }))
          if (isThisPlaceCards) dispatch(setSortCards({ sortCards: sortingCardsMethods.ascUpdate }))
        }
      }
      if (whatWeSort === 'Created by' || whatWeSort === 'Grade') {
        if (isArrowDown) {
          if (!isThisPlaceCards)
            dispatch(setSortPacks({ sortPacks: sortingPacksMethods.desUserName }))
          if (isThisPlaceCards) dispatch(setSortCards({ sortCards: sortingCardsMethods.desGrade }))
        } else if (!isArrowDown) {
          if (!isThisPlaceCards)
            dispatch(setSortPacks({ sortPacks: sortingPacksMethods.ascUserName }))
          if (isThisPlaceCards) dispatch(setSortCards({ sortCards: sortingCardsMethods.ascGrade }))
        }
      }
    },
    [dispatch]
  )

  return (
    <>
      {captions.map(m => (
        <Caption key={m.id} name={m.label} callback={sortHandler} />
      ))}
    </>
  )
}

type CaptionsPropsType = {
  captions: Array<{ id: string; label: string }>
  isThisPlaceCards: boolean
}
