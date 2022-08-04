import mailer from '@sendgrid/mail'

mailer.setApiKey(process.env.SENDGRID_API_KEY ?? '')

const msg = {
  to: 'test@example.com',
  from: 'test@example.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

export default mailer
