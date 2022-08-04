import AuthorHeader from '../StoryListItem/AuthorHeader'
import StoryListItem from '../StoryListItem'
import type { StoryListItemType } from '../../../../server/services/mongodb/queries'

type StoryListItemAuthorProps = {
  story: StoryListItemType
}

const StoryListItemAuthor = ({ story }: StoryListItemAuthorProps) => {
  return (
    <StoryListItem
      story={story}
      renderHeader={(story) => <AuthorHeader userData={story.userData} />}
    />
  )
}

export default StoryListItemAuthor
