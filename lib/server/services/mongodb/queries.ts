import type { UserSession } from '../../utils/auth'
import connectDB from './connectDB'
import { STORY_LIMIT } from './constants'
import getCollection from './getCollection'

export type StoryListItemType = {
  _id: string
  title: string
  excerpt: string
  published: boolean
  userId: string
  userData: {
    username: string
    name: string
    avatar: string
  }
  slug: string
  createdAt: string
  thumbnail: string
  tags: Array<string>
}

export type StoryListType = Array<StoryListItemType>

export type StoryDetailsType = StoryListItemType & {
  content: string
}

export type UserType = {
  _id: string
  name: string
  email: string
  isVerified: boolean
  avatar: string
  username: string
}

type ListStoriesQueryParams = {
  page: number
  filter?: {
    userId?: string
    published: boolean
    username?: string
  }
}
export const listStoriesByPage = async ({
  page,
  filter,
}: ListStoriesQueryParams) => {
  const db = await connectDB()
  const storyCollection = getCollection(db)('stories')
  const PAGE = page
  const LIMIT = STORY_LIMIT
  let FILTER = {}

  if (filter) {
    FILTER = {
      published: filter.published,
    }

    if (filter.userId) {
      FILTER = {
        userId: { $not: { $eq: filter.userId } },
        published: filter.published,
      }
    }

    if (filter.username) {
      FILTER = {
        'userData.username': filter.username,
        published: filter.published,
      }
    }
  }

  const stories = await storyCollection
    .find(FILTER, {
      skip: (PAGE - 1) * LIMIT,
      limit: LIMIT,
      sort: [['createdAt', -1]],
      projection: {
        content: 0,
      },
    })
    .toArray()

  return JSON.parse(JSON.stringify(stories)) as StoryListType
}
