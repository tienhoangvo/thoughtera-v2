import type { Db } from 'mongodb'

type CollectionName = 'users' | 'stories' | 'emailVerificationTokens'

const getCollection = (db: Db) => (name: CollectionName) => {
  return db.collection(name)
}

export default getCollection
