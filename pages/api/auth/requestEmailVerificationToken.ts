import { requestEmailVerificationToken } from '../../../lib/server/controllers/authController'
import routeHandler from '../../../lib/server/routeHandler'

const requestEmailVerificationTokenHandler = routeHandler({
  onPost: requestEmailVerificationToken,
})

export default requestEmailVerificationTokenHandler
