import React, { useCallback } from 'react'

import { useAppDispatch } from '../../../app/store'
import { setSortCards } from '../../../features/packsPage/cards/cards-reducer'
import { setSortPacks } from '../../../features/packsPage/packs-reducer'
import { sortingCardsMethods, sortingPacksMethods } from '../../constants/sortingMethods'

import { Caption } from './Caption'

export const Captions = ({ captions, isThisPlaceCards }: CaptionsPropsType) => {
  const dispatch = useAppDispatch()

  const sortHandler = useCallback(
    (whatWeSort: string, isArrowDown: boolean) => {
      if (whatWeSort === 'Name') {
        if (isArrowDown) {
          dispatch(setSortPacks(sortingPacksMethods.desName))
        } else if (!isArrowDown) {
          dispatch(setSortPacks(sortingPacksMethods.ascName))
        }
      }
      if (whatWeSort === 'Cards') {
        isArrowDown
          ? dispatch(setSortPacks(sortingPacksMethods.desCardsCount))
          : dispatch(setSortPacks(sortingPacksMethods.ascCardsCount))
      }
      if (whatWeSort === 'Last Updated') {
        if (isArrowDown) {
          if (!isThisPlaceCards) dispatch(setSortPacks(sortingPacksMethods.desUpdate))
          if (isThisPlaceCards) dispatch(setSortCards(sortingCardsMethods.desUpdate))
        } else if (!isArrowDown) {
          if (!isThisPlaceCards) dispatch(setSortPacks(sortingPacksMethods.ascUpdate))
          if (isThisPlaceCards) dispatch(setSortCards(sortingCardsMethods.ascUpdate))
        }
      }
      if (whatWeSort === 'Created by' || whatWeSort === 'Grade') {
        if (isArrowDown) {
          if (!isThisPlaceCards) dispatch(setSortPacks(sortingPacksMethods.desUserName))
          if (isThisPlaceCards) dispatch(setSortCards(sortingCardsMethods.desGrade))
        } else if (!isArrowDown) {
          if (!isThisPlaceCards) dispatch(setSortPacks(sortingPacksMethods.ascUserName))
          if (isThisPlaceCards) dispatch(setSortCards(sortingCardsMethods.ascGrade))
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
