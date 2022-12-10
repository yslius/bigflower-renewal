import { DataTypes, Sequelize } from 'sequelize'
import { pgConnect } from '../utils/postgre.sql'
import bcrypt from 'bcrypt'
import config from 'config'
import logs from '../utils/logs'

interface Users {
    id?: Number,
    email?: Number,
    password?: String, 
    first_name?: String, 
    last_name?: String, 
    roles?: Number, 
    remark?: String,
    session?: String
}

const users = pgConnect.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.INTEGER
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roles: {
        type: DataTypes.INTEGER
    },
    remark: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    session: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    underscored: true
})

users.beforeCreate((user: any) => {
    try {
        if (user.password) {
            let saft = bcrypt.genSaltSync(parseInt(config.get('SAFT')))
            user.dataValues.password = bcrypt.hashSync(user.password, saft)
        }
    } catch (error) {
        logs.error(error)
        throw new Error(JSON.stringify(error))
    }
})

users.beforeUpdate((user: any) => {
    try {
        if (user.password) {
            let saft = bcrypt.genSaltSync(parseInt(config.get('SAFT')))
            user.dataValues.password = bcrypt.hashSync(user.password, saft)
        }
    } catch (error) {
        logs.error(error)
        throw new Error(JSON.stringify(error))
    }
})

users.afterFind((user: any) => {
    user.dataValues.full_name = user.dataValues.first_name + user.dataValues.last_name
})

export {
    users,
    Users
}
