import { Container } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import StoryForm from '../lib/client/components/stories/StoryForm/StoryForm'
import { createStory } from '../lib/client/services/stories'

const NewStoryPage = () => {
  const router = useRouter()
  return (
    <Container>
      <StoryForm
        onSave={(_, submitData, finishSaving) => {
          createStory({
            title: submitData.title as string,
            content: submitData.content as string,
            excerpt: submitData.excerpt as string,
            published: submitData.published as boolean,
            tags: submitData.tags as Array<string>,
          }).then((data) => {
            if (finishSaving) {
              finishSaving()
            }
            if (data.status === 'success') {
              showNotification({
                title: 'Story Created Successfully',
                message: `${submitData.title} has been created`,
              })
              let href = '/my-stories'
              if (!submitData.published) {
                href += '/drafts'
              }
              router.push(href)
            }

            if (data.status === 'failed') {
              showNotification({
                title: 'Story Saving Failed',
                message: data.message,
                color: 'red',
              })
            }
          })
        }}
      />
    </Container>
  )
}

export default NewStoryPage
