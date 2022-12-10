import express, { Request, Response } from 'express'
import { Router } from 'express'
import { importData, uploadFiles } from '../controllers/import.controller'
import { sendMailOrder } from '../controllers/mail.order.controller'
import UPLOAD_FILES from '../middlewares/upload.files'
import bodyParser from 'body-parser'
import { products, orders } from '../controllers/products.controller'
import { create, update } from '../controllers/user.controller'
import validate from '../middlewares/validates'
import { CREATE_USER, LOGIN, UPDATE_USER } from '../schemas/users.schema'
import { EMAIL_UNIQUE } from '../middlewares/email.validate'
import { authUser, authUserDelete, authUserInfo } from '../controllers/auth.controller'
import deserializeUser from '../middlewares/deserialize.user'
import { QUANTITY_ORDER } from '../middlewares/quantity.order'
const routers = Router()

routers.use(express.json({limit: '50mb'}))
routers.use(bodyParser.json({limit: '50mb'}))
routers.use(express.urlencoded({ extended: true, limit: '50mb'}))

//upload file
routers.post('/upload-files', [UPLOAD_FILES.array('files'), deserializeUser], uploadFiles)
routers.post('/import', deserializeUser, importData)
//get products
routers.get('/products/:type_sale/:page/:size/:search?', products)
//mail order products
routers.post('/order-products', QUANTITY_ORDER, sendMailOrder)
//get user
routers.post('/user', [validate(CREATE_USER), EMAIL_UNIQUE], create)
routers.put('/user', validate(UPDATE_USER), update)
routers.get('/user', validate(UPDATE_USER), update)

routers.post('/auth', validate(LOGIN), authUser)
routers.put('/auth', deserializeUser, authUserDelete)
routers.get('/auth', deserializeUser, authUserInfo)

/**
 * Return 404 for not find request
 */
routers.get('*', (req: Request, res: Response)=> {
    res.status(404).send(`Cannot ${req.method} ${req.originalUrl} \nQuery: ${JSON.stringify(req.query)} \nParams: ${JSON.stringify(req.params)} \nBody: ${JSON.stringify(req.body)}`)
})

export default routers