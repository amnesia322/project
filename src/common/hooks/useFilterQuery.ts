/*
import { useCallback, useMemo } from 'react'

import { useLocation, useSearchParams } from 'react-router-dom'

import { sortingPacksMethods } from '../constants/sortingMethods'

const getQueryStringFromObject = (filter: any) => {
  return new URLSearchParams(filter).toString()
}

export const getObjectFromQueryString = (search: string) => {
  const paramsEntries = new URLSearchParams(search).entries()

  return Object.fromEntries(paramsEntries)
}

export function useFilterQuery<T extends object>(
  getFilterQuery?: (query: string) => T,
  getSearchQuery?: (filter: T) => string
): useFilterQueryTypes<T> {
  const { search } = useLocation()
  const history = ''
  const omit = require('omit')
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const filter = useMemo(
    () =>
      // используем функцию переданную через параметры или дефолтную
      getFilterQuery ? getFilterQuery(search) : getObjectFromQueryString(search),
    [search, getFilterQuery]
  )

  const setSearchQuery = useCallback(
    (filter: T) => {
      // используем функцию переданную через параметр или дефолтную
      const search = getSearchQuery
        ? getSearchQuery(filter)
        : getQueryStringFromObject(filter).toString()

      history.replace({ search })
    },
    [history, getSearchQuery]
  )

  const сhangeFilter = useCallback(
    (fieldName: string) => (value: string) => {
      const newFilter = { ...filter, [fieldName]: value }

      setSearchQuery(newFilter)
    },
    [filter, setSearchQuery]
  )

  const сlearFilter = useCallback(
    (fieldName: string) => () => {
      const newFilter = omit(filter, fieldName)

      setSearchQuery(newFilter)
    },
    [filter, setSearchQuery]
  )

  // возвращаем сам фильтр и две функции для его изменения
  return [filter, сhangeFilter, сlearFilter]
}

export type Filter = {
  min?: string
  max?: string
  pageCount?: string
  sortPacks?: sortingPacksMethods
  packName?: string
  user_id?: string
}

type useFilterQueryTypes<T> = [
  T,
  (fieldName: string) => (value: string) => void,
  (fieldName: string) => () => void
]
*/

const lall = ''

export default lall
