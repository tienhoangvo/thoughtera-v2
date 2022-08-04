import type { ObjectId } from 'mongodb'

type StoryType = {
  _id?: ObjectId | string
  userId?: ObjectId | string
  title?: string
  excerpt?: string
  thumbnail?: string
  content?: string
  createdAt?: Date
  slug?: string
  published?: boolean
}

export default StoryType
