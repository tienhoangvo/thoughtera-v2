import { signup } from '../../../lib/server/controllers/authController'
import routeHandler from '../../../lib/server/routeHandler'

const signupHandler = routeHandler({
  onPost: signup,
})

export default signupHandler
