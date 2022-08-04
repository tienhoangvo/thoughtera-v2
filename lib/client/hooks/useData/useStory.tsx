import useSWR from 'swr'
import { StoryDetailsType } from '../../../server/services/mongodb/queries'

type slug = string
type id = string

type useStoryParams = {
  identifier: slug | id
}

type StatusType = 'idle' | 'loading' | 'success' | 'failed'

const useStory = ({ identifier }: useStoryParams) => {
  const { data, error, mutate } = useSWR(() =>
    identifier ? `/api/stories/${identifier}` : undefined
  )
  const story = data ? (data.story as StoryDetailsType) : null

  let status: StatusType = 'idle'

  if (!data && !error) {
    status = 'loading'
  }

  if (data) {
    status = data.status
  }

  if (error) {
    status = 'failed'
  }

  return {
    story,
    error,
    status,
    mutate,
  }
}

export default useStory
