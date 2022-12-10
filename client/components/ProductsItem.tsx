import React, { useEffect, useState } from 'react'

type propsProductItem =  {
	name: string,
	description: string,
	price: string | number,
	numberLots: string | number,
	size: string,
	unit: string,
    note: string, 
    isOrder?: undefined|boolean,
    inventory: number,
    typeProduct: string,
    isConfirm?: undefined|boolean,
    sortId: number|string,
    vat: number,
    typeSale: string,
    deleteOne?: Function,
    quantity?: undefined|number|string
}

const ProductItem: React.FC<propsProductItem> = ({name, description, price, numberLots, size, unit, note, isOrder, inventory, typeProduct, isConfirm, sortId, vat, typeSale, deleteOne, quantity}) => {
    isOrder = isOrder?? true
    isConfirm = isConfirm?? false
    quantity = quantity??''

    const [qtily, setQtily] = useState<string|number>('')

    useEffect(()=>{
        if (quantity) {
            setQtily(quantity>inventory? inventory: quantity)
        }
    }, [quantity])

    const handlOrderChange = (e: any) => {
        if (e.target.value == 0) {
            setQtily('')
        }else{
            setQtily(e.target.value)
        }
        if (e.target.value as number >inventory) {
            e.target.value = inventory
            setQtily(inventory)
        }
        let list:Array<object> = JSON.parse(localStorage.getItem(typeSale) as string)??[]
        let currentItem: Array<object> = list.filter((i: any) => { 
            return i.sort_id == sortId && i.type_sale == typeSale && i.name == name
        })
        if (list.length==0||currentItem.length==0) {
            list.push({
                name: name,
                description: description,
                price: price,
                lot_number: numberLots,
                size: size,
                unit: unit,
                note: note,
                inventory: inventory,
                quantity: e.target.value,
                sort_id: sortId,
                vat: vat,
                type_sale: typeSale,
                type_product: typeProduct
            })
        } else {
            list = list.map((i: any)=>{
                if (i.sort_id == sortId && i.type_sale == typeSale && i.name == name) {
                    return {...i, quantity: e.target.value}
                }else{
                    return i
                }
            })
        }
        localStorage.setItem(typeSale, JSON.stringify(list))
    }

    const handlDeleteOrder = () =>{
        if (deleteOne) {
            deleteOne({
                name: name,
                description: description,
                sortId: sortId,
                typeSale: typeSale,
            })
        }
    }

	return (
		<div className={`product-item flex-r ${typeProduct}`}>
            <div className="name">
                <b>{name}</b>
            </div>
            <div className="info flex-c">
                <div className="description">
                    {description}
                </div>
                <div className="note">
                    {note}
                </div>
            </div>
            <div className="params flex-c">
                <div className="line-param flex-r">
                    <b className="label">単価（円）</b>
                    <span className="value">：{price}円</span>
                </div>
                <div className="line-param flex-r">
                    <b className="label">ロット数</b>
                    <span className="value">：{numberLots}</span>
                </div>
                <div className="line-param flex-r">
                    <b className="label">等級</b>
                    <span className="value">：{size}</span>
                </div>
            </div>
            <div className="add flex-c">
                <div className="flex-r">
                    {(typeProduct=='sale')&&<div className="controll">
                            <input type="number" name="quality" min={0} placeholder='0' disabled={!isOrder||isConfirm} value={!isOrder ? inventory: qtily} onChange={handlOrderChange}/>
                        </div>
                    }
                    {(typeProduct=='sale')&&<div className="unit">
                            <b>{unit}</b>
                        </div>
                    }
                    {isConfirm && <div className="action-delete" onClick={handlDeleteOrder}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </div>
                    }
                </div>
                {
                    (typeProduct=='sale'&& qtily >= inventory&&!isConfirm)&&(
                        <div className="error">{`残り  ${inventory}点`}</div>
                    )
                }                
            </div>
        </div>
	)
}

export default ProductItem