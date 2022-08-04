import { verifyEmailAddress } from '../../../lib/server/controllers/authController'
import routeHandler from '../../../lib/server/routeHandler'

const verifyEmailHandler = routeHandler({
  onPost: verifyEmailAddress,
})

export default verifyEmailHandler
