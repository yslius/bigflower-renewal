import express from 'express'
import config from 'config'
import logs from './utils/logs'
import routers from './routers'
import { connectDb } from './utils/postgre.sql'
import { mailVerify } from './utils/mailler'
import cors, { CorsOptions } from 'cors'
import https from 'https'
import fs from 'fs'

var port = config.get<number>('PORT')
const protocol = config.get('PROTOCOL')

const optionCors: CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: true,//`${config.get('API_URL')}:9848`, 
    preflightContinue: false,
}

var app: https.Server | express.Express = express()
// add cors
app.use(cors(optionCors))
// add routers
app.use('/api', routers)
// public folder
// const STORAGE = config.get<any>('STORAGE')
// console.log(path.join(__dirname.replace('/src', '')))
// app.use('public', express.static(path.join(__dirname.replace('/src', ''), `/${STORAGE.SUB_PATH}/${STORAGE.PATH.IMP}`)))

if (protocol==='https') {
    const options:https.ServerOptions = {
        key: fs.readFileSync('./ssl/localhost.decrypted.key', 'utf8'),
        cert: fs.readFileSync('./ssl/localhost.crt', 'utf8'),
        // passphrase: config.get('PSPHRASE')
    }
    app = https.createServer(options, app)
}

app.listen(port, config.get('DOMAIN'), async() => {
    logs.info(`Server run at ${protocol}://${config.get('DOMAIN')}:${port}`)

    await connectDb()
    await mailVerify()
})