import { protectAccess } from '../../../../lib/server/controllers/authController'
import { listUserStories } from '../../../../lib/server/controllers/storyController'
import routeHandler from '../../../../lib/server/routeHandler'

const userStories = routeHandler({
  onGet: protectAccess(listUserStories),
})

export default userStories
