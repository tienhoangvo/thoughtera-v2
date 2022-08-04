import { Container, LoadingOverlay } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import StoryForm, {
  StorySubmitDataType,
} from '../../lib/client/components/stories/StoryForm/StoryForm'
import useStory from '../../lib/client/hooks/useData/useStory'
import { updateStory } from '../../lib/client/services/stories'

const StoryEditPage = () => {
  const router = useRouter()
  const { storyId } = router.query

  const { story, status, mutate } = useStory({ identifier: storyId as string })

  return (
    <Container>
      <LoadingOverlay visible={status === 'loading'} />
      {story && (
        <StoryForm
          story={story}
          onSave={(id, submitData, onSuccess) => {
            updateStory(id, submitData).then(() => {
              showNotification({
                title: 'Story updated successfully',
                message: `${story.title} has been updated`,
              })
              mutate()
              if (onSuccess) {
                onSuccess()
              }
            })
          }}
        />
      )}
    </Container>
  )
}

export default StoryEditPage
