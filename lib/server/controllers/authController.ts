import type { methodHandler } from '../routeHandler'
import connectDB from '../services/mongodb/connectDB'
import bcrypt from 'bcryptjs'
import getCollection from '../services/mongodb/getCollection'
import generateOTP from '../utils/generateOTP'
import { ObjectId } from 'mongodb'
import { serialize } from 'cookie'
import { generateAccessToken, verifyAuth } from '../utils/auth'
import { ACCESS_TOKEN } from '../utils/constants'
import mailer from '../services/sendgrid/mailer'
import { getEmailVerificationMsg } from '../services/sendgrid/msgTemplates'
export const protectAccess =
  (cb: methodHandler): methodHandler =>
  async (req, res) => {
    const { accessToken } = req.cookies

    if (!accessToken) {
      return res.status(401).json({
        status: 'failed',
        message: 'Log in to access this endpoint!',
      })
    }

    try {
      const payload = await verifyAuth(accessToken)
      req.body = { ...req.body, session: payload }
      return cb(req, res)
    } catch (error: any) {
      return res.status(401).json({
        status: 'failed',
        message: error.message,
        error: error,
      })
    }
  }

export const signin: methodHandler = async (req, res) => {
  const db = await connectDB()
  const userCollection = getCollection(db)('users')

  const { username, password } = req.body

  const user = await userCollection.findOne({
    username,
  })

  if (!user) {
    return res.status(401).json({
      status: 'failed',
      message: `Username or password is incorrect!`,
    })
  }

  if (!user.isVerified) {
    return res.status(401).json({
      status: 'failed',
      message: `You must verify your email address ${user.email} to log in`,
      userId: user._id,
      userEmail: user.email,
    })
  }

  const matched = await bcrypt.compare(password, user.password)

  if (!matched) {
    return res.status(401).json({
      status: 'failed',
      message: `Email or password is incorrect!`,
    })
  }

  const accessToken = await generateAccessToken({
    _id: user._id.toString(),
    name: user.name,
    username: user.username,
    email: user.email,
    isVerified: user.isVerified,
    avatar: user.avatar,
  })

  res.setHeader(
    'Set-Cookie',
    serialize(ACCESS_TOKEN, accessToken, {
      maxAge: 60 * 60 * 2,
      path: '/',
    })
  )

  res.status(200).json({
    status: 'success',
    user,
    accessToken,
  })
}

export const signup: methodHandler = async (req, res) => {
  const db = await connectDB()
  const userCollection = getCollection(db)('users')
  const emailVerificationTokenCollection = getCollection(db)(
    'emailVerificationTokens'
  )

  const { username, email, password, name } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  let newUser = {
    username,
    email,
    password: hashedPassword,
    isVerified: false,
    name,
    avatar: '/imgs/avatar.jpg',
  }
  try {
    const { insertedId } = await userCollection.insertOne(newUser)

    const OTP = generateOTP(6)

    const hashedToken = await bcrypt.hash(OTP, 10)

    await emailVerificationTokenCollection.insertOne({
      token: hashedToken,
      userId: insertedId,
      createdAt: new Date(),
    })

    await mailer.send(getEmailVerificationMsg(email, OTP))

    res.status(201).json({
      status: 'success',
      OTP,
      user: {
        ...newUser,
        _id: insertedId,
      },
    })
  } catch (error: any) {
    if (error.code === 11000) {
      error.message = `${Object.keys(error.keyValue)[0]}: ${
        Object.values(error.keyValue)[0]
      } already exists`
    }
    res.status(400).json({
      status: 'failed',
      error: error,
      message: error.message,
    })
  }
}

export const requestEmailVerificationToken: methodHandler = async (
  req,
  res
) => {
  const { userId } = req.body

  const db = await connectDB()
  const userCollection = getCollection(db)('users')

  const emailVerificationTokenCollection = getCollection(db)(
    'emailVerificationTokens'
  )

  const user = await userCollection.findOne({
    _id: new ObjectId(userId),
  })

  if (!user) {
    return res.status(404).json({
      status: 'failed',
      message: `No user found with the given ID: ${userId}`,
    })
  }

  const currentToken = await emailVerificationTokenCollection.findOne({
    userId: user._id,
  })

  if (currentToken) {
    return res.status(400).json({
      status: 'failed',
      message:
        'You already have an active OTP generated, please open your email to use it or wait until it expires!',
    })
  }

  const OTP = generateOTP(6)

  const hashedToken = await bcrypt.hash(OTP, 10)

  try {
    await emailVerificationTokenCollection.insertOne({
      token: hashedToken,
      userId: user._id,
      createdAt: new Date(),
    })

    await mailer.send(getEmailVerificationMsg(user.email, OTP))

    res.status(201).json({
      status: 'success',
      message: `An OTP with 6 digits long has been sent to your email address ${user.email}. It will be expired after 3 minutes.`,
      OTP,
    })
  } catch (error: any) {
    res.status(500).json({
      error: error,
      message: error.message,
    })
  }
}

export const verifyEmailAddress: methodHandler = async (req, res) => {
  const db = await connectDB()
  const userCollection = getCollection(db)('users')
  const emailVerificationTokenCollection = getCollection(db)(
    'emailVerificationTokens'
  )

  const { userId, OTP } = req.body

  const emailVerificationToken = await emailVerificationTokenCollection.findOne(
    {
      userId: new ObjectId(userId),
    }
  )

  if (!emailVerificationToken) {
    return res.status(404).json({
      status: 'failed',
      message: 'Your OTP has been expired!',
    })
  }
  const { token } = emailVerificationToken

  const isMatched = await bcrypt.compare(OTP, token)

  if (!isMatched) {
    return res.status(400).json({
      status: 'failed',
      message: 'Incorrect OTP',
    })
  }

  await userCollection.findOneAndUpdate(
    {
      _id: new ObjectId(userId),
    },
    {
      $set: {
        isVerified: true,
      },
    }
  )

  await emailVerificationTokenCollection.deleteOne({
    _id: emailVerificationToken._id,
  })

  res.status(200).json({
    status: 'success',
    message:
      'Your email has been verified, you can now log in into the system to explore our resources!',
    todos: [
      {
        name: 'login',
        url: '/login',
        apiEndpoint: '/api/auth/login',
      },
    ],
  })
}

export const changeEmailAddress: methodHandler = (req, res) => {
  res.status(200).json({
    status: 'success',
    user: {},
  })
}

export const changePassword: methodHandler = (req, res) => {
  res.status(200).json({
    status: 'success',
    user: {},
  })
}

export const forgotPassword: methodHandler = (req, res) => {
  res.status(200).json({
    status: 'success',
    user: {},
  })
}

export const resetPassword: methodHandler = (req, res) => {
  res.status(200).json({
    status: 'success',
    user: {},
  })
}

export const getCurrentUser: methodHandler = (req, res) => {
  const { session } = req.body

  res.status(200).json({
    status: 'success',
    user: session,
  })
}

export const signOut: methodHandler = (req, res) => {
  res.setHeader(
    'Set-Cookie',
    serialize('accessToken', '', {
      maxAge: 0,
      path: '/',
    })
  )

  res.status(200).json({
    status: 'success',
    message: 'You logged out!',
  })
}
