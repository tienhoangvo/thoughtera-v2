import { Button, Group, LoadingOverlay, Modal, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { resendOTP, verifyEmail } from '../../../services/auth'

type VerifyEmailModalProps = {
  userId?: string
  userEmail?: string
  opened: boolean
  onClose: () => void
}
const VerifyEmailModal = ({
  userId,
  userEmail,
  opened,
  onClose,
}: VerifyEmailModalProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [OTP, setOTP] = useState('')
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!userId) return
    setLoading(true)
    verifyEmail({
      userId,
      OTP,
    }).then((res) => {
      if (res.status === 'success') {
        showNotification({
          title: 'Email has been verified successfully!',
          color: 'teal',
          message: res.message,
        })

        onClose()
      }

      if (res.status === 'failed') {
        setLoading(false)
        showNotification({
          title: 'Email Verification Failed!',
          color: 'red',
          message: res.message,
        })
      }
    })
  }

  const handleResendOTPClick = () => {
    if (!userId) return
    setLoading(true)
    setOTP('')
    resendOTP({ userId }).then((res) => {
      if (res.status === 'success') {
        setLoading(false)
        showNotification({
          title: 'New OTP generated',
          color: 'teal',
          message: res.message,
        })
      }

      if (res.status === 'failed') {
        setLoading(false)
        showNotification({
          title: 'Cannot generate new OTP now',
          color: 'red',
          message: res.message,
        })
      }
    })
  }

  const handleOTPChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOTP(event.target.value)
  }

  return (
    <Modal size="md" opened={opened} onClose={onClose} title={'Verify Email'}>
      <LoadingOverlay visible={loading} />
      <form onSubmit={handleFormSubmit}>
        <TextInput
          required
          label="Email"
          description="Open your email inboxes at the email adress below. Check the latest inboxes"
          size="sm"
          mb="md"
          type="email"
          value={userEmail}
          readOnly
        />
        <TextInput
          required
          label="OTP"
          value={OTP}
          onChange={handleOTPChange}
          description="OTP will be expired in 3 minutes. Click on the Resend OTP button to generate a new one!"
          size="lg"
          mb="md"
          type="tel"
          maxLength={6}
          minLength={6}
          name="OTP"
        />
        <Group position="apart">
          <Button variant="subtle" onClick={handleResendOTPClick}>
            Resend OTP
          </Button>
          <Button type="submit" variant="light">
            Verify
          </Button>
        </Group>
      </form>
    </Modal>
  )
}

export default VerifyEmailModal
