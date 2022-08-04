type SignInProps = {
  username: string
  password: string
}

type SignUpProps = {
  username: string
  password: string
  name: string
  email: string
}

type VerifyEmailProps = {
  userId: string
  OTP: string
}

type ResendOTPProps = {
  userId: string
}

export const signIn = ({ username, password }: SignInProps) => {
  return fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json())
}

export const signUp = ({ username, email, password, name }: SignUpProps) => {
  return fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      name,
    }),
  }).then((res) => res.json())
}

export const getCurrentUser = () => {
  return fetch('/api/auth/currentUser', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}

export const signout = () => {
  return fetch('/api/auth/signout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}

export const verifyEmail = ({ userId, OTP }: VerifyEmailProps) => {
  return fetch('/api/auth/verifyEmail', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      OTP,
    }),
  }).then((res) => res.json())
}

export const resendOTP = ({ userId }: ResendOTPProps) => {
  return fetch('/api/auth/requestEmailVerificationToken', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
    }),
  }).then((res) => res.json())
}
