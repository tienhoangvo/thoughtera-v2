import { Button, Group, LoadingOverlay, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import Link from 'next/link'
import { z } from 'zod'
import { useState } from 'react'

import AuthLayout from '../lib/client/components/layouts/AuthLayout'
import VerifyEmailModal from '../lib/client/components/modals/VerifyEmailModal'
import { signIn } from '../lib/client/services/auth'
import { NextPageWithLayout } from './_app'

type UserData = {
  userId: string
  userEmail: string
} | null

const SignInSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(5, { message: 'Username should have at least 5 letters' }),

  password: z.string().trim().min(5, 'Username should have at least 5 letters'),
})

const SignInPage: NextPageWithLayout = () => {
  const [status, setStatus] = useState('idle')
  const [userData, setUserData] = useState<UserData>(null)
  const form = useForm({
    validate: zodResolver(SignInSchema),
    initialValues: {
      username: '',
      password: '',
    },
    validateInputOnChange: true,
  })

  const handleSubmit = (values: typeof form.values) => {
    setStatus('signing-in')
    signIn({
      ...values,
    }).then((res) => {
      if (res.status === 'success') {
        if (typeof window !== 'undefined') {
          window.location.reload()
        }
      }

      if (res.status === 'failed') {
        setStatus('idle')

        showNotification({
          title: 'Sign in failed!',
          color: 'red',
          message: res.message,
        })

        if (res.userId) {
          setUserData({
            userEmail: res.userEmail as string,
            userId: res.userId as string,
          })
        }
      }
    })
  }

  const handleVerifyEmailClose = () => {
    setUserData(null)
  }

  return (
    <>
      <LoadingOverlay visible={status === 'signing-in'} />
      <VerifyEmailModal
        opened={!!userData}
        userEmail={userData?.userEmail}
        userId={userData?.userId}
        onClose={handleVerifyEmailClose}
      />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Username"
          mb="md"
          type="text"
          variant="filled"
          {...form.getInputProps('username')}
        />
        <TextInput
          required
          label="Password"
          mb="md"
          type="password"
          variant="filled"
          {...form.getInputProps('password')}
        />
        <Group position="apart">
          <Link href="/sign-up" passHref>
            <Button variant="subtle">{`I don't have an account`}</Button>
          </Link>
          <Button
            type="submit"
            variant="light"
            disabled={Object.keys(form.errors).length > 0}
          >
            Sign in
          </Button>
        </Group>
      </form>
    </>
  )
}

SignInPage.getLayout = (page) => {
  return <AuthLayout title="Sign in">{page}</AuthLayout>
}

export default SignInPage
