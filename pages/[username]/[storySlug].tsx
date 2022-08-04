import { Container, LoadingOverlay } from '@mantine/core'
import { ObjectId } from 'mongodb'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import MainLayout from '../../lib/client/components/layouts/MainLayout'
import StoryArticle from '../../lib/client/components/stories/StoryArticle'

import connectDB from '../../lib/server/services/mongodb/connectDB'
import getCollection from '../../lib/server/services/mongodb/getCollection'
import { StoryDetailsType } from '../../lib/server/services/mongodb/queries'
import { NextPageWithLayout } from '../_app'

const StoryPage: NextPageWithLayout = (props: { story?: StoryDetailsType }) => {
  const router = useRouter()

  if (router.isFallback || !props.story)
    return <LoadingOverlay visible={true} />

  return (
    <Container size="md">
      <StoryArticle story={props.story} />
    </Container>
  )
}

StoryPage.getLayout = (page) => {
  return <MainLayout user={page.props.user}>{page}</MainLayout>
}

export const getStaticProps: GetStaticProps = async (context) => {
  const db = await connectDB()

  const storyCollection = getCollection(db)('stories')
  const userCollection = getCollection(db)('users')
  const story = await storyCollection.findOne({
    slug: context.params?.storySlug,
    published: true,
  })

  if (!story) {
    return {
      notFound: true,
    }
  }

  const user = await userCollection.findOne({
    _id: new ObjectId(story.userId),
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      story: JSON.parse(JSON.stringify(story)),
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  console.log('-- Fetching story paths')
  const db = await connectDB()
  const storyCollection = getCollection(db)('stories')
  const stories = await storyCollection
    .find(
      {
        published: true,
      },
      {
        projection: {
          slug: 1,
          userData: 1,
        },
      }
    )
    .toArray()

  const storyPaths = stories.map((story) => {
    return {
      params: {
        username: `@${story.userData.username}`,
        storySlug: story.slug as string,
      },
    }
  })

  return {
    paths: storyPaths,
    fallback: true,
  }
}

export default StoryPage
