import { protectAccess } from '../../../lib/server/controllers/authController'
import {
  deleteStory,
  getStory,
  updateStory,
} from '../../../lib/server/controllers/storyController'
import routeHandler from '../../../lib/server/routeHandler'

const storyHandler = routeHandler({
  onGet: getStory,
  onPatch: protectAccess(updateStory),
  onDelete: protectAccess(deleteStory),
})

export default storyHandler
