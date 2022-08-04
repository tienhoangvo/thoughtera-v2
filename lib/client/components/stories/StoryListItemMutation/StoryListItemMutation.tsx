import { Text, LoadingOverlay } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { StoryListItemType } from '../../../../server/services/mongodb/queries'
import useUserStories from '../../../hooks/useData/useUserStories'
import { deleteStory, updateStory } from '../../../services/stories'
import StoryListItem from '../StoryListItem'
import MutationHeader from '../StoryListItem/MutationHeader'

type StoryListItemMutationProps = {
  story: StoryListItemType
}

const StoryListItemMutation = ({ story }: StoryListItemMutationProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { mutate } = useUserStories(story.published)

  const publishStory = () => {
    setLoading(true)
    updateStory(story._id, {
      published: true,
    }).then(() => {
      setLoading(false)
      router.push('/my-stories')
    })
  }

  const handlePrimaryButtonClick = () => {
    publishStory()
  }

  const handleDeleteClick = () => {
    openConfirmModal({
      title: 'Delete a story',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete{' '}
          <em>
            <strong>{story.title}</strong>
          </em>{' '}
          ?
        </Text>
      ),
      labels: {
        cancel: 'Cancel',
        confirm: 'Delete',
      },
      cancelProps: {
        variant: 'subtle',
      },
      confirmProps: {
        color: 'red',
        variant: 'light',
      },
      onConfirm: () => {
        setLoading(true)
        deleteStory(story._id).then(() => {
          showNotification({
            title: 'You have deleted a story',
            message: `${story.title} has beem deleted`,
          })
          mutate()
        })
      },
    })
  }

  const handleEditClick = () => {
    router.push(`/my-stories/edit?storyId=${story._id}`)
  }

  return (
    <StoryListItem
      loader={<LoadingOverlay visible={loading} />}
      story={story}
      renderHeader={(story) => (
        <MutationHeader
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          published={story.published}
          onPrimaryClick={handlePrimaryButtonClick}
        />
      )}
    />
  )
}

export default StoryListItemMutation
