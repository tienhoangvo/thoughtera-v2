import useSWR from 'swr'
import type { StoryListType } from '../../../server/services/mongodb/queries'

const useUserStories = (published = true) => {
  const { data, error, mutate } = useSWR(
    `/api/users/me/stories?published=${published}`
  )

  const stories: StoryListType = (data && data.stories) || []

  return {
    stories: stories,
    loading: !data && !error,
    mutate,
  }
}

export default useUserStories
