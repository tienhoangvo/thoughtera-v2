import { StoryDetailsType } from '../../server/services/mongodb/queries'
import fetcher from './fetcher'

type createStoryProps = {
  title: string
  content: string
  excerpt: string
  published: boolean
  tags: Array<string>
}

export const createStory = ({
  title,
  content,
  excerpt,
  published = false,
  tags,
}: createStoryProps) => {
  return fetch('/api/stories', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      content,
      excerpt,
      published,
      tags,
    }),
  }).then((res) => res.json())
}

type updateStoryDataType = {
  title?: string
  content?: string
  excerpt?: string
  published?: boolean
  tags?: Array<string>
}

export const updateStory = (
  id: string | undefined,
  data: updateStoryDataType
) => {
  return fetcher(`/api/stories/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((data) => data.story as StoryDetailsType)
}

export const deleteStory = (id: string) => {
  return fetch(`/api/stories/${id}`, {
    method: 'DELETE',
  })
}

export type StoryType = {
  title: string
  excerpt: string
  content: string
  _id: string
  createdAt: string
  published?: boolean
  slug: string
  userData: {
    name: string
    avatar: string
    username: string
  }
}

export type ListStoryType = Array<StoryType>

export const listStories = (key: string) => {
  return fetch(key, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data.stories as ListStoryType)
}

export const getStoryDetails = (slug: string) => {
  let url = '/api/stories/story'

  return fetch(`${url}/${slug}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data.story as StoryType)
}
