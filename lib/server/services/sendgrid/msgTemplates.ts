const SENDER = process.env.SENDGRID_SENDER!

export const getEmailVerificationMsg = (email: string, OTP: string) => {
  return {
    to: email,
    from: SENDER, // Use the email address or domain you verified above
    subject: 'Email Verification',
    text: `Your OTP is: ${OTP}. It stays valid for 3 mins`,
    html: `<p>Your OTP is: <strong>${OTP}</strong>. It stays valid for 3 mins</p>`,
  }
}
