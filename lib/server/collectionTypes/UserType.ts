import { ObjectId } from 'mongodb'

type UserType = {
  _id?: ObjectId | string
  username?: string
  password?: string
  isVerified?: boolean
  email?: string
  avatar?: string
  name?: string
}

export default UserType
