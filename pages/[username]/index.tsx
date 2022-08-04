import { Container, LoadingOverlay } from '@mantine/core'
import { useRouter } from 'next/router'
import type { GetStaticPaths, GetStaticProps } from 'next'

import StoryListItemAuthor from '../../lib/client/components/stories/StoryListItemAuthor'
import StoryList from '../../lib/client/components/stories/StoryList/StoryList'
import connectDB from '../../lib/server/services/mongodb/connectDB'
import getCollection from '../../lib/server/services/mongodb/getCollection'
import { NextPageWithLayout } from '../_app'
import MainLayout from '../../lib/client/components/layouts/MainLayout'

import type {
  StoryListType,
  UserType,
} from '../../lib/server/services/mongodb/queries'

const AuthorStoriesPage: NextPageWithLayout = (props: {
  stories?: StoryListType
}) => {
  const router = useRouter()
  const stories = props.stories || []

  if (router.isFallback) {
    return <LoadingOverlay visible />
  }

  return (
    <Container size="md">
      <StoryList
        stories={stories}
        renderListItem={(story) => <StoryListItemAuthor story={story} />}
      />
    </Container>
  )
}

AuthorStoriesPage.getLayout = (page) => {
  return <MainLayout user={page.props.user as UserType}>{page}</MainLayout>
}

export const getStaticProps: GetStaticProps = async (context) => {
  const username = context.params?.username as string

  const db = await connectDB()

  const userCollection = getCollection(db)('users')
  const storyCollection = getCollection(db)('stories')
  const user = await userCollection.findOne(
    { username: username.replace('@', '') },
    {
      projection: {
        password: 0,
      },
    }
  )

  if (!user) {
    return {
      notFound: true,
    }
  }

  const stories = await storyCollection
    .find(
      { userId: user._id.toString(), published: true },
      { projection: { content: 0 } }
    )
    .toArray()

  return {
    props: {
      stories: JSON.parse(JSON.stringify(stories)) as StoryListType,
      user: JSON.parse(JSON.stringify(user)) as UserType,
    },

    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const db = await connectDB()

  const userCollection = getCollection(db)('users')

  const users = await userCollection
    .find(
      {},
      {
        projection: {
          username: 1,
        },
      }
    )
    .toArray()

  const usernamePaths = users.map((user) => {
    return {
      params: {
        username: '@' + user.username,
      },
    }
  })

  return {
    paths: usernamePaths,
    fallback: true,
  }
}

export default AuthorStoriesPage
