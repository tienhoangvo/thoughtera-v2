import { signin } from '../../../lib/server/controllers/authController'
import routeHandler from '../../../lib/server/routeHandler'

const signinHandler = routeHandler({
  onPost: signin,
})

export default signinHandler
