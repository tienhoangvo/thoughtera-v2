import { signOut } from '../../../lib/server/controllers/authController'
import routeHandler from '../../../lib/server/routeHandler'

const signoutHandler = routeHandler({
  onPost: signOut,
})

export default signoutHandler
