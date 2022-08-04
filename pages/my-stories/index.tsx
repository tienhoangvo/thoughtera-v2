import { Container, LoadingOverlay } from '@mantine/core'

import MainLayout from '../../lib/client/components/layouts/MainLayout'
import UserStoriesLayout from '../../lib/client/components/layouts/UserStoriesLayout'
import StoryList from '../../lib/client/components/stories/StoryList/StoryList'
import StoryListItemMutation from '../../lib/client/components/stories/StoryListItemMutation'
import useUserStories from '../../lib/client/hooks/useData/useUserStories'

import type { NextPageWithLayout } from '../_app'

const UserPublishedStories: NextPageWithLayout = () => {
  const { stories, loading } = useUserStories()
  return (
    <Container size="md">
      <LoadingOverlay visible={loading} />
      <StoryList
        stories={stories}
        renderListItem={(story) => <StoryListItemMutation story={story} />}
      />
    </Container>
  )
}

UserPublishedStories.getLayout = (page) => {
  return (
    <MainLayout>
      <UserStoriesLayout>{page}</UserStoriesLayout>
    </MainLayout>
  )
}

export default UserPublishedStories
