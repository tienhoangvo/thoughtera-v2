import {
  addUser,
  listUsers,
} from '../../../lib/server/controllers/userController'
import routeHandler from '../../../lib/server/routeHandler'

const usersHandler = routeHandler({
  onGet: listUsers,
  onPost: addUser,
})

export default usersHandler
