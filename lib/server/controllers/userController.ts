import { ObjectId } from 'mongodb'
import type { methodHandler } from '../routeHandler'
import getCollection from '../services/mongodb/getCollection'
import connectDB from './../services/mongodb/connectDB'

export const listUsers: methodHandler = async (req, res) => {
  const db = await connectDB()
  const userCollection = getCollection(db)('users')

  const users = await userCollection
    .find(
      {
        isVerified: true,
      },
      { projection: { password: 0 } }
    )
    .toArray()

  res.status(200).json({
    status: 'success',
    users: users,
  })
}

export const addUser: methodHandler = (req, res) => {
  res.status(201).json({
    status: 'success',
    user: {},
  })
}

export const getUser: methodHandler = async (req, res) => {
  const db = await connectDB()
  const userCollection = getCollection(db)('users')

  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({
      status: 'failed',
      message: 'Invalid typeof ID',
    })
  }

  let _id

  try {
    _id = new ObjectId(id)
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: 'Invalid typeof ID',
    })
  }

  const user = await userCollection.findOne({
    _id: _id,
  })

  if (!user) {
    return res.status(404).json({
      status: 'failed',
      message: `No user found with the ID of ${id}`,
    })
  }

  res.status(200).json({
    status: 'success',
    user: user,
  })
}

export const updateUser: methodHandler = (req, res) => {
  res.status(200).json({
    status: 'success',
    user: {},
  })
}

export const deleteUser: methodHandler = async (req, res) => {
  const db = await connectDB()
  const userCollection = getCollection(db)('users')

  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({
      status: 'failed',
      message: 'Invalid typeof ID',
    })
  }

  let _id

  try {
    _id = new ObjectId(id)
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: 'Invalid typeof ID',
    })
  }

  await userCollection.deleteOne({
    _id,
  })

  res.status(204).end()
}
