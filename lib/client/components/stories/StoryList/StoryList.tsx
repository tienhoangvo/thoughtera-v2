import { Stack } from '@mantine/core'
import { Fragment, ReactElement } from 'react'
import type {
  StoryListItemType,
  StoryListType,
} from '../../../../server/services/mongodb/queries'

type StoryListProps = {
  stories: StoryListType
  renderListItem: (story: StoryListItemType) => ReactElement
}

const StoryList = ({ stories, renderListItem }: StoryListProps) => {
  const listItems = stories.map((story) => (
    <Fragment key={story._id}>{renderListItem(story)}</Fragment>
  ))

  return (
    <Stack sx={{ width: '100%' }} spacing="lg">
      {listItems}
    </Stack>
  )
}

export default StoryList
