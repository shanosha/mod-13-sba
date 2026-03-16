import express from 'express'
import controller from '../controllers/productController.js'

const routes = express.Router()

routes.post('/', controller.createProduct)
routes.get('/', controller.getProducts)
routes.get('/:id', controller.getProductById)
routes.put('/:id', controller.replaceProductById)
routes.delete('/:id', controller.deleteProductById)

export default routes