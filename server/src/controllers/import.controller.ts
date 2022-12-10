import {Request, Response} from 'express'
import fs from 'fs'
import config from 'config'
import { productsCreateOrUpdate } from '../services/products.services'

interface ImportData{
    hanbai1T: Array<String>,
    hanbai2T: Array<String>,
    hanbai3T: Array<String>,
    headerT: Array<String>,
    knoT: Array<Number>,
    souba: string,
    comment1: string,
    kh: Array<string>,
    km: Array<string>,
    kt:Array<number>,
    ko:Array<string>,
    kl:Array<number>,
    kn:Array<string>,
    kb:Array<string>,
    comment2: string
}

export async function uploadFiles(req: Request, res: Response){
    let ksouba:ImportData|any = null, zaiko:Array<number>|any = null
    let files:any = req.files??null
    if (files.length>0) {
        try {
            let subPath = config.get<string>('SUB_PATH')
            for (let index = 0; index < files.length; index++) {
                const element = files[index]
                if (element.path.toLowerCase().includes('zaiko')) {
                    let file = fs.readFileSync(`${subPath}${element.path}`, 'utf8')
                    file = file.replace('// -->', '')
                    file = file.replace('<!--', '')
                    file = file.replace(/(Zaiko\d\d)/g, 'export const zaiko')
                    fs.writeFileSync(`${subPath}${element.path}`, file)
                    zaiko = await import(`${subPath}${element.path}`)
                }
                if (element.path.toLowerCase().includes('ksouba')) {
                    let file = fs.readFileSync(`${subPath}${element.path}`, 'utf8')
                    file = file.replace('<!--', '')
                    file = file.replace('// -->', '')
                    file = file.replace('kaisen', 'export const kaisen')
                    file = file.replace('stypeT', 'export const stypeT')
                    file = file.replace('kaisenT', 'export const kaisenT')
                    file = file.replace('knenT', 'export const knenT')
                    file = file.replace('ktukiT', 'export const ktukiT')
                    file = file.replace('khiT', 'export const khiT')
                    file = file.replace('snenT', 'export const snenT')
                    file = file.replace('stukiT', 'export const stukiT')
                    file = file.replace('shiT', 'export const shiT')
                    file = file.replace('sjiT', 'export const sjiT')
                    file = file.replace('shunT', 'export const shunT')
                    file = file.replace('syoubiT', 'export const syoubiT')
                    file = file.replace('osusumeT', 'export const osusumeT')
                    file = file.replace('uketori', 'export const uketori')
                    file = file.replace('hanbai1T', 'export const hanbai1T')
                    file = file.replace('hanbai2T', 'export const hanbai2T')
                    file = file.replace('hanbai3T', 'export const hanbai3T')
                    file = file.replace('headerT', 'export const headerT')
                    file = file.replace('knoT', 'export const knoT')
                    file = file.replace('souba', 'export const souba')
                    file = file.replace('comment1', 'export const comment1')
                    file = file.replace('kh =', 'export const kh =')
                    file = file.replace('km =', 'export const km =')
                    file = file.replace('kt =', 'export const kt =')
                    file = file.replace('ko =', 'export const ko =')
                    file = file.replace('kl =', 'export const kl =')
                    file = file.replace('kn =', 'export const kn =')
                    file = file.replace('kb =', 'export const kb =')
                    file = file.replace('kk =', 'export const kk =')
                    file = file.replace('comment2', 'export const comment2')
                    file = file.replace(/(\[ \d\d \]=)|(\[\d\d\]=)|(\[ \d \]=)|(\[\d\]=)/g, '=')
                     
                    fs.writeFileSync(`${subPath}${element.path}`, file)
                    ksouba = await import(`${subPath}${element.path}`)
                }
            }
            if (!zaiko||!ksouba) {
                throw new Error('Files import much be correct.');
            }
            let listData = []
            let name = ''
            let description = ''
            let size = ''
            let remark = ''
            let type_product = ''
            for (let index = 0; index < ksouba.kb.length; index++) {
                name = ksouba.kh[index].includes('＃　〃') ? name : ksouba.kh[index].replace(/＠|＃/g, '')
                description = ksouba.km[index].includes('〃') ? description : ksouba.km[index]
                size = ksouba.ko[index].includes('〃') ? size : ksouba.ko[index]
                remark = ksouba.kb[index].includes('〃') ? remark : ksouba.kb[index]
                type_product = ksouba.kh[index].indexOf('＠') == 0 ? config.get<any>('TYPE_PRODUCT').NOTE : config.get<any>('TYPE_PRODUCT').SALE
                let vat = ksouba.kk? (ksouba.kl[index] > 10 ? 10 : ksouba.kl[index]): 0
                let item = {
                    sort_id: index,
                    name: name,
                    description: description,
                    price: ksouba.kk ? ksouba.kk[index] : ksouba.kt[index], // tien truoc thue
                    size: size,
                    lot_number: ksouba.kl[index],
                    unit: ksouba.kn[index],
                    remark: remark,
                    inventory: ksouba.kh[index].indexOf('＠') == 0 ? 0 : zaiko.zaiko[index],
                    vat: vat, // chua bit
                    price_vat: ksouba.kk? Math.round(ksouba.kk[index]+ksouba.kk[index]*vat/100):ksouba.kt[index], // tien sau thue
                    type_product: type_product
                }
                if (item.inventory>0||type_product==config.get<any>('TYPE_PRODUCT').NOTE) {
                    listData.push(item)
                }
            }
            return res.status(200).json({
                status: true,
                data: listData
            })
        } catch (error: any) {
            console.log(error)
            return res.status(404).json({
                status: false,
                messages: 'Upload file is error.',
                error: error.toString()
            })
        }
    }
    return res.status(404).json({
        status: false,
        messages: 'Upload file is error.'
    })
}

export function importData(req: Request, res: Response){
    let params = req.body
    productsCreateOrUpdate(params)
    .then((result) => {
        return res.status(200).json({
            status: true,
            data: result
        })
    }).catch((err) => {
        return res.status(404).json({
            status: false,
            messages: 'Import data is error.',
            error: err
        })
    })
}