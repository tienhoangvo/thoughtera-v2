import { NextApiRequest, NextApiResponse } from 'next'

export type methodHandler = (req: NextApiRequest, res: NextApiResponse) => void

type RouteHandlerProps = {
  onGet?: methodHandler
  onPost?: methodHandler
  onPatch?: methodHandler
  onDelete?: methodHandler
}

const routeHandler =
  ({ onGet, onPost, onPatch, onDelete }: RouteHandlerProps) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req

    const endpoint = `${req.method} ${req.url}`

    if (process.env.NODE_ENV === 'development') {
      console.log(endpoint)
    }

    switch (method) {
      case 'GET': {
        if (onGet) return onGet(req, res)
        break
      }

      case 'POST': {
        if (onPost) return onPost(req, res)
        break
      }

      case 'DELETE': {
        if (onDelete) return onDelete(req, res)
        break
      }

      case 'PATCH': {
        if (onPatch) return onPatch(req, res)
        break
      }
    }

    return res.status(404).json({
      status: 404,
      message: `Not found API endpoint with ${endpoint}`,
    })
  }

export default routeHandler
