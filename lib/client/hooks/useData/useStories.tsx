import { useSWRConfig } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { StoryListType } from '../../../server/services/mongodb/queries'
import { StatusType } from './utils'

type useStoriesProps = {
  username?: string
}

const fetcher = (key: string) => {
  return fetch(key, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data.stories as StoryListType)
}

const useStories = ({ username }: useStoriesProps) => {
  const { fallback } = useSWRConfig()
  const firstPageData = fallback['/api/stories?page=1'] as StoryListType
  const { data, setSize, error } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      let path = '/api/stories'
      let query = ''
      if (username) {
        if (query.length > 0) {
          query += '&'
        }
        query += `username=${username.replace('@', '')}`
      }

      if (query.length > 0) {
        query += '&'
      }

      query += `page=${pageIndex + 1}`

      return `${path}?${query}`
    },
    fetcher,
    {
      fallbackData: [firstPageData],
    }
  )

  let status: StatusType = 'idle'

  if (!data && !error) {
    status = 'loading'
  }

  if (data) {
    status = 'success'
  }

  if (error) {
    status = 'failed'
  }

  const nextPage = () => {
    setSize((size) => size + 1)
  }

  return {
    stories: data
      ? data.reduce((prev, curr) => {
          return prev.concat(...curr)
        }, [])
      : [],
    nextPage,
    status,
  }
}

export default useStories
