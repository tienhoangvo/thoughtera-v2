import { Button, Group, LoadingOverlay, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { z } from 'zod'
import AuthLayout from '../lib/client/components/layouts/AuthLayout'
import { signUp } from '../lib/client/services/auth'
import { NextPageWithLayout } from './_app'

const SignUpSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(5, { message: 'Username should have at least 5 letters' }),
  password: z.string().trim().min(5, 'Username should have at least 5 letters'),
  name: z.string().min(1),
  email: z.string().email(),
})

const SignUpPage: NextPageWithLayout = () => {
  const [status, setStatus] = useState<'idle' | 'signing-up'>('idle')

  const router = useRouter()

  const form = useForm({
    validate: zodResolver(SignUpSchema),
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
    },
    validateInputOnChange: true,
  })

  const handleFormSubmit = (values: typeof form.values) => {
    setStatus('signing-up')
    signUp(values).then((res) => {
      if (res.status === 'success') router.push('/sign-in')

      if (res.status === 'failed') {
        setStatus('idle')
        showNotification({
          title: 'Sign up failed',
          message: res.message,
          color: 'red',
        })
      }
    })
  }

  return (
    <>
      <LoadingOverlay visible={status === 'signing-up'} />
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <TextInput
          required
          label="Name"
          size="sm"
          mb="md"
          type="text"
          autoComplete="off"
          variant="filled"
          {...form.getInputProps('name')}
        />
        <TextInput
          required
          label="Email"
          size="sm"
          mb="md"
          type="email"
          autoComplete="off"
          variant="filled"
          {...form.getInputProps('email')}
        />
        <TextInput
          required
          label="Username"
          size="sm"
          mb="md"
          type="text"
          autoComplete="off"
          variant="filled"
          {...form.getInputProps('username')}
        />
        <TextInput
          required
          label="Password"
          size="sm"
          mb="md"
          type="password"
          autoComplete="off"
          variant="filled"
          {...form.getInputProps('password')}
        />
        <Group position="apart">
          <Link href="/sign-in" passHref>
            <Button variant="subtle" component="a">
              I have an account
            </Button>
          </Link>
          <Button
            type="submit"
            variant="light"
            disabled={Object.keys(form.errors).length > 0}
          >
            Sign up
          </Button>
        </Group>
      </form>
    </>
  )
}

SignUpPage.getLayout = (page) => {
  return <AuthLayout title="Sign up">{page}</AuthLayout>
}

export default SignUpPage
