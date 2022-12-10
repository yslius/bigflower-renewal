import React from 'react'
import ProductItem from 'components/ProductsItem'

type listItemProductProp = {
    listItems: Array<any>,
    isOrder?: undefined|boolean,
    isConfirm?: undefined|boolean,
    deleteOne?: undefined|Function
}

const ListItemProducts: React.FC<listItemProductProp> = ({listItems, isOrder, isConfirm, deleteOne}) => {
    isOrder = isOrder?? true
    isConfirm = isConfirm?? false

    return (
        <div className="list-products">
            <div className="list-head flex-r">
                {/* <div className="image">画像</div> */}
                <div className="name">品名</div>
                <div className="info">品目</div>
                <div className="params"> </div>
                {
                    isOrder&&<div className="add">注文</div>
                }
            </div> 
            <div className="list-item-product">
                {
                    listItems.map((item, index) =>{
                        return <ProductItem 
                            key={index} 
                            name={item.name} 
                            description={item.description}
                            price={item.price}
                            numberLots={item.lot_number}
                            size={item.size}
                            unit={item.unit}
                            note={item.note}
                            inventory={item.inventory}
                            typeProduct={item.type_product}
                            typeSale={item.type_sale}
                            sortId={item.sort_id}
                            vat={item.vat}
                            isConfirm={isConfirm}
                            isOrder={isOrder}
                            deleteOne={deleteOne}
                            quantity={item.quantity}/>
                    })
                }
            </div>
        </div>
	)
}

export default ListItemProducts