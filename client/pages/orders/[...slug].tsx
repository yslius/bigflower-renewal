import Layouts from 'layouts'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {pages, Page} from 'config/pages'
import Link from 'next/link'
import Products from 'api/Products'
import config from 'config'
import getAddress from 'api/ZipCode'

let initForm = {
    name: '',
    id: '',
    password: '',
    email: '',
    name_reci: '',
    postcode: '',
    address: '',
    phone: '',
    comment: ''
}
let initFormError = {
    name: false,
    id: false,
    password: false,
    email: false,
    name_reci: false,
    postcode: false,
    address: false,
    phone: false
}
const Contact = () => {
    const router = useRouter()
    const [page, setPage] = useState<Page|null>(null)
    const [params, setParams] = useState<Array<number|string>|string>([])
    const [pathBase, setPathBase] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number|string>(1)
    const [form, setForm] = useState<any>(initForm)
    const [formError, setFormError] = useState<any>(initFormError)
    const [showModalOrder, setShowModalOrder] = useState(false)
    const [isConfirm, setIsConfirm] = useState(false)
    const [isHiddenInput, setIsHiddenInput] = useState(false)
    const [isSendMail, setIsSendMail] = useState(false)
    const [messageSendMail, setMessageSendMail] = useState('メールが送信されました')
    
    useEffect(()=>{
        let slug: Array<number|string>|string = router.query.slug??[]
        if (slug.length) {
            setParams(slug)
            setPathBase(`${router.pathname.replace('[...slug]', '')}${slug[0]}`)
            setPage(pages[slug[0]])
            setCurrentPage(slug[1]??1)
            if (slug[0]=='kaisen20'||slug[0]=='kaisen21'||slug[0]=='kaisen23') {
                setIsHiddenInput(true)
            }
        }
    }, [router.query.slug])

    const handlOrderProducts = () => {
        if (isConfirm) {
            let listOrder = JSON.parse(localStorage.getItem(params[0] as string) as string)??[]
            let data = {
                listOrder: listOrder,
                info: form,
                type_sale: params[0]
            }
            Products.orderProducts(JSON.stringify(data))
            .then((result: any) => {
                if (result.status) {
                    setIsSendMail(true)
                    setShowModalOrder(true)
                    localStorage.removeItem(params[0] as string)
                }else{
                    setIsSendMail(false)
                    setMessageSendMail(result.message)
                    setShowModalOrder(true)
                    let listOrder:any = JSON.parse(localStorage.getItem(params[0] as string) as string)
                    console.log(listOrder)
                    listOrder = listOrder.filter((i: any)=> {
                        return i.sort_id!=result.data.sort_id||i.name!=result.data.name
                    })
                    
                    localStorage.setItem(params[0] as string, JSON.stringify(listOrder))
                }
            }).catch((err) => {
                setIsSendMail(false)
                console.log('Loi send mail')
            })            
        } else {
            let lisKey = Object.keys(initFormError)
            let isError = false
            let error:any = {}
            for (let index = 0; index < lisKey.length; index++) {
                const item = lisKey[index]
                if (item == 'id' && isHiddenInput) {
                    continue
                }
                if (item == 'password' && isHiddenInput) {
                    continue
                }
                if (formError[item]) {
                    error[item]= true
                    isError = true
                }
            }
            setFormError({...formError, ...error})
            if (!isError) {
                setIsConfirm(true)
            }
        }
    }

    const handlOnBlur =(e: any) =>{
        if (e.target.value!='') {
            form[e.target.name]=e.target.value
            setForm({...form, [e.target.name]: e.target.value})
            setFormError({...formError, [e.target.name]: false})
        }else{
            setFormError({...formError, [e.target.name]: true})
        }
        if (e.target.name=='email') {
            let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

            if (!e.target.value.match(regex)) {
                setFormError({...formError, [e.target.name]: true})
            }
        }
        if (e.target.name=='postcode'&&e.target.value!='') {
            let regex = /[0-9]{3}((-)|(ー))?[0-9]{4}/g
            if (e.target.value.match(regex)) {
                getAddress(e.target.value)
                .then((result: any) => {
                    if (result) {
                        setForm({...form, address: `${result.city.pref.name}${result.city.name}${result.name}`})
                        setFormError({...formError, address: false})
                        setFormError({...formError, postcode: false})
                    }else{
                        setForm({...form, address: ''})
                        setFormError({...formError, address: true})
                        setFormError({...formError, postcode: true})
                    }
                }).catch((err) => {
                    setFormError({...formError, address: true})
                });
            } else {
                setFormError({...formError, [e.target.name]: true})
            }
        }
        if (e.target.name=='phone') {
            let regex = /^(\+\d{2})?[\s.-]?\(?\d{2,3}\)?[\s.-]?\d{4}[\s.-]?\d{4}$/g 
            if (!e.target.value.match(regex)) {
                setFormError({...formError, phone: true})
            }else{
                setFormError({...formError, phone: false})
            }
        }
    }

    const handlBack = () => {
        if (isConfirm) {
            setIsConfirm(false)
        } else {
            router.back()
        }
    }

    const handlAgree = () => {
        setShowModalOrder(false)
        if (isSendMail) {
            router.push('/')
        } else {
            router.back()
        }
    }

    const handlPostCode = () =>{
        let regex = /[0-9]{3}((-)|(ー))?[0-9]{4}/g
        if (form.postcode.match(regex)) {
            getAddress(form.postcode)
            .then((result: any) => {
                if (result) {
                    setForm({...form, address: `${result.city.pref.name}${result.city.name}${result.name}`})
                    setFormError({...formError, address: false})
                    setFormError({...formError, postcode: false})
                }else{
                    setForm({...form, address: ''})
                    setFormError({...formError, address: true})
                    setFormError({...formError, postcode: true})
                }
            }).catch((err) => {
                setFormError({...formError, address: true})
            });
        } else {
            setFormError({...formError, postcode: true})
        }
    }

    const handlChange = (e: any) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }
   
	return (
        <Layouts description='Contacts address'>
            <div className="contact">
                <div className="contact-header">
                    {
                        page?.title && <h3 className="title">
                            {page?.title}
                        </h3>
                    }
                    <div className="card-note">
                        {
                            page?.cardNote.map((i, index)=>{
                                return <div className="line" key={index}>{i}</div>
                            })
                        }
                    </div>
                    <div className="list-memo">
                        {
                            page?.memos.map((i, index)=>{
                                if (typeof i == 'string') {
                                    return <div className="line" key={index}>{i}</div>
                                }else{
                                    return <div className="line" key={index}>{i.text1}<Link href={i.link}><a className='link'>{i.label}</a></Link>{i.text2}</div>
                                }
                            })
                        }
                    </div>
                </div>
                <div className="contact-content">
                    <div className="group flex-r">
                        <div className="label">
                            名前  
                            <span className="required">
                                (必須)
                            </span>
                        </div>
                        <div className="validate">
                            <div className="controll">
                                <input type="text" name='name' value={form.name} disabled={isConfirm} onBlur={handlOnBlur} onChange={handlChange}/>
                            </div>
                            {formError.name&&<span className="error">
                                    名前を入力してください。
                                </span>
                            }
                            
                        </div>
                    </div>
                    {!isHiddenInput&&<div className="group flex-r">
                        <div className="label">
                            ID  
                            <span className="required">
                                (必須)
                            </span>
                        </div>
                        <div className="validate">
                            <div className="controll">
                                <input type="text" name='id' value={form.id} disabled={isConfirm} onBlur={handlOnBlur} onChange={handlChange}/>
                            </div>
                            {formError.id&&<span className="error">
                                    IDを入力してください。
                                </span> 
                            }   
                        </div>
                    </div>}
                    {!isHiddenInput&&<div className="group flex-r">
                        <div className="label">
                        パスワード  
                            <span className="required">
                                (必須)
                            </span>
                        </div>
                        <div className="validate">
                            <div className="controll">
                                <input type="password" name='password' value={form.password} disabled={isConfirm} onBlur={handlOnBlur} onChange={handlChange}/>
                            </div>
                            {formError.password&&<span className="error">
                                    パスワードを入力してください。
                                </span>
                            }
                        </div>
                    </div>}
                    <div className="group flex-r">
                        <div className="label">
                            メールアドレス  
                            <span className="required">
                                (必須)
                            </span>
                        </div>
                        <div className="validate">
                            <div className="controll">
                                <input type="text" name='email' value={form.email} disabled={isConfirm} onBlur={handlOnBlur} onChange={handlChange}/>
                            </div>
                            {formError.email&&<span className="error">
                                    メールアドレスが不正です。
                                </span>
                            }
                        </div>
                    </div>
                    <div className="note">
                        <p>ご注意：メールアドレスを間違えると返信メールを送れません。</p>
                        <p>お願い：お届け先住所には都道府県名も正確にご記入ください。</p>
                    </div>
                    <div className="group flex-r name">
                        <div className="label">
                            お届け先氏名 
                            <span className="required">
                                (必須)
                            </span>
                        </div>
                        <div className="validate">
                            <div className="controll">
                                <input type="text" name='name_reci' value={form.name_reci} disabled={isConfirm} onBlur={handlOnBlur} onChange={handlChange}/>
                            </div>
                            {formError.name_reci&&<span className="error">
                                    お届け先氏名を入力してください。
                                </span>
                            }
                        </div>
                        <div className="select">
                            <select name="subname" disabled={isConfirm} onBlur={handlOnBlur} onChange={handlChange}>
                                <option value="様">様</option>
                                <option value="御中">御中</option>
                            </select>
                        </div>
                    </div>
                    <div className="group post-code flex-r">
                        <div className="label">
                            お届け先郵便番号 
                            <span className="required">
                                (必須)
                            </span>
                        </div>
                        <div className="validate">
                            <div className="controll">
                                <input type="text" name='postcode' value={form.postcode} disabled={isConfirm} onBlur={handlOnBlur} onChange={handlChange}/>
                            </div>
                            {formError.postcode&&<span className="error">
                                お届け先郵便番号を入力してください。
                            </span>
                            }
                        </div>
                        <button className="btn btn-post-code" disabled={isConfirm} onClick={handlPostCode}>検索</button>
                    </div>
                    <div className="group flex-r">
                        <div className="label">
                            お届け先住所 
                            <span className="required">
                                (必須)
                            </span>
                        </div>
                        <div className="validate">
                            <div className="controll">
                                <textarea name='address' value={form.address} disabled={isConfirm} onBlur={handlOnBlur} onChange={handlChange}/>
                            </div>
                            {formError.address&&<span className="error">
                                お届け先住所を入力してください。
                            </span>
                            }
                        </div>
                    </div>
                    <div className="group flex-r">
                        <div className="label">
                            お届け先Tel
                            <span className="required">
                                (必須)
                            </span>
                        </div>
                        <div className="validate">
                            <div className="controll phone">
                                <input type="text" name='phone' value={form.phone} disabled={isConfirm} onBlur={handlOnBlur} onChange={handlChange}/>
                            </div>
                            {formError.phone&&<span className="error">
                                お届け先Telを入力してください。
                            </span>
                            }
                        </div>
                    </div>
                    <div className="group comment flex-r">
                        <div className="label">
                            コメント
                            <span className="required">
                            </span>
                        </div>
                        <div className="validate">
                            <div className="controll">
                                <textarea name='comment' value={form.comment} disabled={isConfirm} onBlur={handlOnBlur} onChange={handlChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="note">
                        <p>地域によって例外ありますが鮮度維持の問題ですべて午前中着指定です。</p>
                        <p>支払方法はすべて代金引換です。振込みは選択できません。</p>
                        <p className='brea'>ラッピング加工しませんのでギフトではありません。</p>
                        <p>以下の欄はビックフラワーへの通信欄に御利用ください</p>
                    </div>
                    <div className="action flex-r">
                        <button className="btn confirm" onClick={handlOrderProducts}>{isConfirm?'送信':'確定'}</button>
                        <button className="btn back" onClick={handlBack}>{isConfirm?'戻る':'キャンセル'}</button>
                    </div>
                </div>
                <div className="contact-footer">
                    <div className="list-memo">
                        {
                            page?.bottomMemo.map((i, index)=>{
                                return <div className="line" key={index}>{i}</div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={`modal modal-order flex-c ${showModalOrder?'show':''}`}>
                <div className="block-modal">
                    <div className="controll flex-c">
                        <h3>{isSendMail?'注⽂が確定しました。ありがとうございます。': 'エラー'}</h3>
                        <p>{messageSendMail}</p>
                    </div>
                    <div className="action flex-r">
                        <button className="btn agree" onClick={handlAgree}>{isSendMail?'閉じる': '選択画面へ戻ります。'}</button>
                    </div>
                </div>
            </div>
        </Layouts>
	)
}

export default Contact