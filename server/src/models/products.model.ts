import {DataTypes} from 'sequelize'
import { pgConnect } from '../utils/postgre.sql'

export interface Products {
    id: Number,
    sort_id: Number,
    name: String, // ten sp kh
    description: String, // mo ta sp km
    inventory: Number, //ton kho
    price: Number, // gia
    vat: Number, // thue
    price_vat: Number, // Lam tron len
    unit: Number, // don vi
    lot_number: String, // don vi ban
    size: String, // kich thuoc 
    type_sale: String, // kaisen03 ... loai hinh ban
    remark: String,
    type_product: String, //san pham ban va sp dung de mo ta sale|note
}

export const products = pgConnect.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    sort_id: {
        type: DataTypes.INTEGER
    },
    type_sale: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    inventory: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    price_vat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    unit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lot_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    remark: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type_product: {
        type: DataTypes.STRING,
        allowNull: false,
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
