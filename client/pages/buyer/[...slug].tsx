import Layouts from 'layouts'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {pages, Page} from 'config/pages'
import Link from 'next/link'
import Pagination from 'components/Pagination'
import ListItemProducts from 'components/ListItemProducts'
import ErrorPage from 'next/error'
import ProductsApi from 'api/Products'
import {setFormatDate} from 'utils/FuncUtils'

const Products = () => {
    const router = useRouter()
    const [page, setPage] = useState<Page|null>(null)
    const [params, setParams] = useState<Array<number|string>|string>([])
    const [pathBase, setPathBase] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number|string>(1)
    const [products, setProducts] = useState([])
    const [pageSize, setPageSize] = useState(15)
    const [lengthResult, setLengthResult] = useState(0)
    const [searchText, setSearchText] = useState<string>('')
    const [isConfirm, setIsConfirm] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [showModalDeleteOne, setShowModalDeleteOne] = useState<boolean>(false)
    const [itemDelete, setItemDelete] = useState<any>({})
    const currentDate = new Date()
    
    useEffect(()=>{
        let slug: Array<number|string>|string = router.query.slug??[]
        if (slug.length) {
            setParams(slug)
            setPathBase(`${router.pathname.replace('[...slug]', '')}${slug[0]}`)
            setPage(pages[slug[0]])
            setCurrentPage(slug[1]??1)
        }
        if (slug[0]) {
            setProducts([])
            setLengthResult(0)
            ProductsApi.getProducts(`${slug[0]}/${slug[1]??1}/${pageSize}/${searchText}`)
            .then((result: any) => {
                if (result.status) {
                    let listItem = JSON.parse(localStorage.getItem(slug[0] as string) as string)??[]
                    let data = result.data.map((i: any) => {
                        let item = listItem.filter((f: any)=>{
                            return f.sort_id == i.sort_id && f.type_sale == i.type_sale && f.name == i.name
                        })
                        if (item.length>0) {
                            return {...i, quantity: item[0].quantity > i.inventory ? i.inventory : item[0].quantity}
                        }
                        return i
                    })
                    setProducts(data)
                    setLengthResult(result.totals)
                } else {
                    setProducts([])
                    setLengthResult(0)
                }
            }).catch((err) => {
                setProducts([])
                setLengthResult(0)
            })
        }
    }, [router.query.slug])
    
    if (page!==null && !page) {
        return <ErrorPage statusCode={404}/>
    }

    const handlSearch = (e: any) => {
        setSearchText(e.target.value)
    }

    const handlSubmitSearch = () => {
        if (isConfirm) {
            let listItem = JSON.parse(localStorage.getItem(params[0] as string) as string)??[]
            if (searchText!='') {
                listItem = listItem.filter((i: any)=>{
                    return i.name.includes(searchText)||i.description.includes(searchText)
                })
                setProducts(listItem)
                setLengthResult(listItem.length)
            } else {
                if (listItem.length) {
                    setProducts(listItem)
                    setLengthResult(listItem.length)
                }
            }
            
        }else{
            setCurrentPage(1)
            router.push(pathBase)
        }
    }

    const hanldClearOrder = () =>{
        if (isConfirm) {
            setIsConfirm(false)
            router.push(pathBase)
        }else{
            setShowModalDelete(true)
        }
    }

    const hanldClearOrderAccept = () => {
        if (isConfirm) {
            router.push(pathBase)
            setIsConfirm(false)
        } else {
            localStorage.removeItem(params[0] as string)
            router.push(pathBase)
        }
        setShowModalDelete(false)
    } 
    
    const handlOrder = () =>{
        let listItem = JSON.parse(localStorage.getItem(params[0] as string) as string)??[]
        listItem = listItem.filter((i: any)=>{
            return i.quantity as number > 0
        })
        if (isConfirm&&listItem.length>0) {
            router.push(`/orders/${params[0]}`)
        } else {
            if (listItem.length) {
                setIsConfirm(true)
                setProducts(listItem)
                setLengthResult(listItem.length)
            }
        }
    }

    const onShowModalDeleteOne = (item: any) =>{
        setShowModalDeleteOne(true)
        setItemDelete(item)
    }

    const hanldClearOrderAcceptOne = () =>{
        setProducts([])
        let listItem = JSON.parse(localStorage.getItem(params[0] as string) as string)??[]
        let list = listItem.filter((i: any)=>{
            return i.sort_id != itemDelete.sortId || i.type_sale != itemDelete.typeSale && i.name != itemDelete.name
        })
        // set list order
        setProducts(list)
        setLengthResult(list.length)
        localStorage.setItem(params[0] as string, JSON.stringify(list))
        setShowModalDeleteOne(false)
    }

	return (
        <Layouts description='Products list item'>
            <div className="product">
                <div className="product-header">
                    {
                        page?.title && <h3 className="title">
                            {page?.title}
                        </h3>
                    }
                    <div className="card-note">
                        {
                            page?.cardNote.map((i, index)=>{
                                return <div className="line" key={index}>{setFormatDate(i, page.format as string, page.addDay as number)}</div>
                            })
                        }
                    </div>
                    <div className="list-memo">
                        {
                            page?.memos.map((i, index)=>{
                                if (typeof i == 'string') {
                                    return <div className="line" key={index}>{setFormatDate(i, page.format as string, page.addDay as number)}</div>
                                }else{
                                    return <div className="line" key={index}>{i.text1}<Link href={i.link}><a className='link'>{i.label}</a></Link>{i.text2}</div>
                                }
                            })
                        }
                    </div>
                </div>
                <div className="product-content">
                    <div className="time flex-r">
                        <div className="label">注文締め切り日時</div>
                        <div className="value">{`${currentDate.getMonth()}月${currentDate.getDate()}日12時00分`}</div>
                    </div>
                    <div className="search flex-r">
                        <div className="group flex-r">
                            <div className="controll flex-r">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </div>
                                <input type="text" name="search" placeholder='商品を検索' onChange={handlSearch} value={searchText}/>
                            </div>
                            <button className='btn btn-search' onClick={handlSubmitSearch}>検索</button>
                            <div className="search-count">{`${lengthResult} 商品`}</div>
                        </div>
                        <div className="group flex-r">
                            <button className="btn btn-add" onClick={handlOrder}>{isConfirm?'注⽂':'選択'}</button>
                            <button className="btn btn-clear" onClick={hanldClearOrder}>{isConfirm?'戻る':'リセット'}</button>
                        </div>
                    </div>
                    <ListItemProducts listItems={products} isOrder={true} isConfirm={isConfirm} deleteOne={onShowModalDeleteOne}/>
                    {(!isConfirm)&&pathBase&&(products.length>0)&&<Pagination 
                        currentPage={currentPage as number} 
                        sizePage={pageSize}
                        lengthResult={lengthResult} 
                        baseHref={pathBase??''}/>}
                </div>
                <div className="product-footer">
                    <div className="list-memo">
                        {
                            page?.bottomMemo.map((i, index)=>{
                                return <div className="line" key={index}>{setFormatDate(i, page.format as string, page.addDay as number)}</div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={`modal modal-clear-all flex-c ${showModalDelete?'show':''}`}>
                <div className="block-modal">
                    <div className="controll flex-c">
                        <h3>実⾏してよろしいですか。</h3>
                        <p>リセットすると、⼊⼒した内容がすべて消去されます</p>
                    </div>
                    <div className="action flex-r">
                        <button className="btn cancel" onClick={()=>setShowModalDelete(false)}>いいえ</button>
                        <button className="btn agree" onClick={hanldClearOrderAccept}>はい</button>
                    </div>
                </div>
            </div>
            <div className={`modal modal-clear-one flex-c ${showModalDeleteOne?'show':''}`}>
                <div className="block-modal">
                    <div className="controll flex-c">
                        <h3>この商品を削除してよろしいですか。</h3>
                    </div>
                    <div className="action flex-r">
                        <button className="btn cancel" onClick={()=>setShowModalDeleteOne(false)}>いいえ</button>
                        <button className="btn agree" onClick={hanldClearOrderAcceptOne}>はい</button>
                    </div>
                </div>
            </div>
        </Layouts>
	)
}

export default Products