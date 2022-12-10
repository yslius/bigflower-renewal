import config from 'config'
import { Sequelize } from 'sequelize'
import logs from './logs'

export const pgConnect = new Sequelize(
    config.get('PG_DB_NAME'),
    config.get('PG_USER'),
    config.get('PG_PASSWORD'),
    {
        host: config.get('PG_HOST'),
        dialect: config.get('PG_CONNETNAME'),
        port: config.get('PG_PORT'),
        logging: (msg)=> {
            if (config.get<Boolean>('NODE_DEV')) {
                logs.info(`SQL: ${msg}`)
            }
        }, 
        dialectOptions: {
            useUTC: false, // for reading from database
        },
        timezone: config.get('PG_TIMEZONE'), // for writing to database
    }
)

export const connectDb = async() => {
    try {
        await pgConnect.authenticate()
        logs.info('Connection PostgreSql has been established successfully.')
    } catch (error) {
        logs.error(error)
    }
}