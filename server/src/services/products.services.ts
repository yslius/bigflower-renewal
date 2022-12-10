import { products, Products } from '../models/products.model'
import {Op} from 'sequelize'
import logs from '../utils/logs'

type Params = {
    type_sale: string,
    dataImport: Array<Products>
}
export async function productsCreateOrUpdate(data: Params) {
    try {
        // Xoa toan bo voi type_sale
        await products.destroy({
            where: {
                type_sale: data.type_sale
            }
        }) 
        // Them type_sale vao records
        const dataCreate = data.dataImport.map((i: Products)=>{
            return {...i, type_sale: data.type_sale}
        })
        return products.bulkCreate(dataCreate)
        .then((result) => {
            return result
        }).catch((err) => {
            logs.error(`Service in: ${err}`)
        });
    } catch (error) {
        logs.error(`Service in: ${error}`)
    }
}

type GetParams = {
    type_sale: string,
    page: number,
    size: number,
    search: string
}
export async function getProducts(params: GetParams) {
    try {
        // get totals
        let count = await products.count({
            where:{
                type_sale: params.type_sale,
                [Op.and]: [
                    {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.like]: `%${params.search??''}%`
                                }
                            },
                            {
                                description: {
                                    [Op.like]: `%${params.search??''}%`
                                }
                            }
                        ]
                    },
                    {
                        [Op.or]: [
                            {
                                inventory: {
                                    [Op.gt]: 0
                                }
                            },{
                                type_product: 'note'
                            }
                        ]
                    }
                ]
            }
        })
        return products.findAll({
            where: {
                type_sale: params.type_sale,
                [Op.and]: [
                    {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.like]: `%${params.search??''}%`
                                }
                            },
                            {
                                description: {
                                    [Op.like]: `%${params.search??''}%`
                                }
                            }
                        ]
                    },
                    {
                        [Op.or]: [
                            {
                                inventory: {
                                    [Op.gt]: 0
                                }
                            },{
                                type_product: 'note'
                            }
                        ]
                    }
                ]
            },
            limit: params.size,
            offset: (params.page-1)*params.size,
            order: [
                ['sort_id', 'ASC']
            ]
        })
        .then((result) => {
            return {
                result: result,
                totals: count
            }
        }).catch((err) => {
            logs.error(`Get Products Error: ${err}`)
        })
    } catch (error) {
        console.log(error)
    }
    
}
type ParamsQuantity = {
    listOrder: Array<any>,
    type_sale: string
}

export function checkQuantityBySortId(params: ParamsQuantity) {
    let type_sale = params.type_sale
    let sort_ids: Array<number> = params.listOrder.map((i: any)=>{
        return i.sort_id
    })
    return products.findAll({
        where: {
            type_sale: type_sale,
            sort_id: {
                [Op.in]: sort_ids
            }
        }
    })
    .then((result: any) => {
        return result
    }).catch((err) => {
        logs.error(`Get Products Error: ${err}`)
        return false
    })
}

export function  updateQuantity(params: ParamsQuantity, inventorys: Array<any>) {
    let type_sale = params.type_sale
    let listOrder: Array<any> = params.listOrder
    try {
        listOrder.forEach(async(item: any) => {
            let itemInventory = inventorys.filter((i: any)=> i.sort_id==item.sort_id)
            if (itemInventory[0].inventory - parseInt(item.quantity) >= 0) {
                await products.update({
                    inventory: itemInventory[0].inventory - parseInt(item.quantity) 
                },{
                    where:{
                        type_sale: type_sale,
                        sort_id: item.sort_id
                    }
                })
            } else {
                throw new Error(`Update quantity products have error, ${JSON.stringify(item)}`);
            }
        })
        logs.warn({
            titel: 'UPDATE QUANTITY PRODUCTS COMPLETE',
            dataUpdate: listOrder,
            dataCurrent: inventorys
        })
    } catch (error) {
        console.log(error)
        logs.error({
            message: 'update products have error',
            error: error,
            dataCurrent: inventorys
        })
    }
    
}