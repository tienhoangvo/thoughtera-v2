import useSWR from 'swr'
import UserType from '../../../server/collectionTypes/UserType'

type CurrentUserStatus = 'loading' | 'success' | 'failed'

const useCurrentUser = () => {
  const { data, error, mutate } = useSWR('/api/users/me')

  let user: UserType | undefined
  let status: CurrentUserStatus = 'loading'
  if (data) {
    status = data.status
    user = data.user
  }
  return {
    user,
    status,
    mutate,
  }
}

export default useCurrentUser
