import { protectAccess } from '../../../lib/server/controllers/authController'
import {
  addStory,
  listStories,
} from '../../../lib/server/controllers/storyController'
import routeHandler from '../../../lib/server/routeHandler'

const storiesHandler = routeHandler({
  onGet: listStories,
  onPost: protectAccess(addStory),
})

export default storiesHandler
