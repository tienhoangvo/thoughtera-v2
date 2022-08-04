import { Card, CardSection, Divider } from '@mantine/core'

import { ReactNode } from 'react'

import { StoryListItemType } from '../../../../server/services/mongodb/queries'

import StoryInfoSnippet from '../StoryInfoSnippet'

type StoryListItemProps = {
  story: StoryListItemType
  renderHeader: (story: StoryListItemType) => ReactNode
  loader?: ReactNode
}

const StoryListItem = ({ story, renderHeader, loader }: StoryListItemProps) => {
  const header = renderHeader(story)
  return (
    <Card
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'light'
            ? theme.colors.gray['0']
            : theme.colors.dark[6],
      })}
    >
      {loader && loader}
      {header}
      <CardSection>
        <Divider my="lg" />
      </CardSection>

      <StoryInfoSnippet story={story} />
    </Card>
  )
}

export default StoryListItem
