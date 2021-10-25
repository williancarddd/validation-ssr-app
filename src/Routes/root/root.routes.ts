import express from 'express'
import { rootController } from '../../Controllers/RootController'
const routerRoot = express.Router()

routerRoot.get('/', rootController.handleGet.bind(rootController) )
routerRoot.post('/', rootController.handlePost.bind(rootController))
export { routerRoot }