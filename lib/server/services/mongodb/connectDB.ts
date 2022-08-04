import { MongoClient } from 'mongodb'

const connectDB = async () => {
  const uri = process.env.MONGODB_URI ?? ''

  new MongoClient(uri)
  const client = new MongoClient(uri)

  await client.connect()

  console.log('--DB: successfully connected!')

  const db = client.db('thoughtera-v1')

  return db
}

export default connectDB
