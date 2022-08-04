const generateOTP = (n = 6) => {
  let OTP = ''

  for (let i = 0; i < n; i++) {
    const digit = Math.floor(Math.random() * 9)
    OTP += digit
  }

  return OTP
}

export default generateOTP
