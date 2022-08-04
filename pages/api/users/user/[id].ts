import {
  deleteUser,
  getUser,
  updateUser,
} from '../../../../lib/server/controllers/userController'
import routeHandler from '../../../../lib/server/routeHandler'

const userHandler = routeHandler({
  onGet: getUser,
  onPatch: updateUser,
  onDelete: deleteUser,
})

export default userHandler
