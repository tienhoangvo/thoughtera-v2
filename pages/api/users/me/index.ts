import {
  getCurrentUser,
  protectAccess,
} from '../../../../lib/server/controllers/authController'
import routeHandler from '../../../../lib/server/routeHandler'

const meHandler = routeHandler({
  onGet: protectAccess(getCurrentUser),
})

export default meHandler
