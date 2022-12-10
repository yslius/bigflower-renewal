import Layouts from 'layouts'
import React, { useState } from 'react'
import {routers} from 'config/router'
import ListItemProducts from 'components/ListItemProducts'
import UploadFiles from 'api/UploadFiles'
import config from 'config'
import { useRouter } from 'next/router'
import { subStringJP } from 'utils/FuncUtils'
import Users from 'api/Users'
import useSignIn from 'utils/useSignIn'

let initForm = {
    email: '',
    password: ''
}
let initFormError = {
    email: false,
    password: false
}

const ImportResult = () => {
    const [dataImport, setDataImport] = useState([])
    const [dataImportDF, setDataImportDF] = useState([])
    const [typeSale, setTypeSale] = useState(config.IMPORT_TYPE[0].key)
    const [showModalImport, setShowModalImport] = useState(false)
    const [showModalLogin, setShowModalLogin] = useState(true)
    const [message, setMessage] = useState('')
    const [inputFile, setInputFile] = useState('')
    const [inputPlaceholder, setInputPlaceholder] = useState('選択されていません')
    const [form, setForm] = useState<any>(initForm)
    const [formError, setFormError] = useState<any>(initFormError)
    const [sigIn, setSignIn, user, setUser] = useSignIn()
    const [lengthResult, setLengthResult] = useState(0)
    const [searchText, setSearchText] = useState<string>('')
    
    const route = useRouter()

    const importOnChange = async (e: any) => {
        const formData = new FormData()
        let fileName = []
        for (let index = 0; index < e.target.files.length; index++) {
            formData.append("files", e.target.files[index])
            let name = e.target.files[index].name
            fileName.push(subStringJP(name, 0, 12, '...'))
        }
        
        setInputPlaceholder(subStringJP(fileName.join(', '), 0, 45, '...'))
        UploadFiles.uploadFile(formData)
        .then((result: any) => {
            if (result.status) {
                setDataImport(result.data)
                setDataImportDF(result.data)
                setLengthResult(result.data.length)
            }else{
                setMessage('インポートデータがエラーです。')
                setShowModalImport(true)
                setDataImport([])
                setDataImportDF([])
                setInputPlaceholder('選択されていません')
                setLengthResult(0)
            }
        }).catch((err) => {
            setMessage('インポートデータがエラーです。')
            setShowModalImport(true)
            setDataImport([])
            setDataImportDF([])
            setInputPlaceholder('選択されていません')
            setLengthResult(0)
        })
    }

    const submitImport = () => {
        let data = JSON.stringify({
            type_sale: typeSale,
            dataImport: dataImport
        })
        UploadFiles.importData(data)
        .then((result: any) => {
            if (result.status) {
                setMessage('データのインポートが完了しました。')
                setShowModalImport(true)
                setDataImport([])
                setInputFile('')
            } else {
                setMessage('インポートデータがエラーです。')
                setShowModalImport(true)
                setInputPlaceholder('選択されていません')
            }
        }).catch((err) => {
            setMessage('インポートデータがエラーです。')
            setShowModalImport(true)
            setInputPlaceholder('選択されていません')
        })
    }

    const handlTypeSaleChange = (e: any) => {
        setTypeSale(e.target.value)
    }

    const handlCancel = () => {
        setShowModalLogin(false)
        route.push(routers.home.url)
    }

    const handlControllOnBlur = (e: any) => {
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
    }

    const handlControllOnChange = (e: any) =>{
        form[e.target.name]=e.target.value??''
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handlSignIn = () => {
        Users.login(JSON.stringify(form))
        .then((result: any) => {
            if (result.status) {
                setSignIn(true)
                setShowModalLogin(false)
                setUser(result.user)
            } else {
                setSignIn(false)
                setShowModalLogin(true)
                setUser(null)
            }
        }).catch((err) => {
            setSignIn(false)
            setShowModalLogin(true)
            setUser(null)
        })
    }
    
    const handlSignOut = () => {
        Users.logout(JSON.stringify(form))
        .then((result: any) => {
            setSignIn(false)
            setShowModalLogin(true)
            setUser(null)
        }).catch((err) => {
            setSignIn(false)
            setShowModalLogin(true)
            setUser(null)
        })
    }

    const handlSearch = (e: any) => {
        setSearchText(e.target.value)
    }

    const handlSubmitSearch = () => {
        if (searchText!='') {
            let listItem = dataImport.filter((i: any)=>{
                return i.name.includes(searchText)||i.description.includes(searchText)
            })
            setDataImport(listItem)
            setLengthResult(listItem.length)
        } else {
            if (dataImport.length) {
                setDataImport(dataImportDF)
                setLengthResult(dataImportDF.length)
            }
        }
    }

	return (
        <Layouts description=''>
            {sigIn&&<div className="import flex-c">
                {user&&(<div className="user-info flex-r">
                    ようこそ、 <label>{user.full_name}</label>さん
                    <button onClick={handlSignOut}>ログアウト</button>
                </div>)}
                <div className="group flex-r">                    
                    <div className="controll file-type">
                        <select name="fileType" id="file-type" className="file-type" onChange={handlTypeSaleChange} value={typeSale}>
                            {
                                config.IMPORT_TYPE.map((item, index) => {
                                    return <option value={item.key} key={index}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="controll file flex-r" data-placeholder={inputPlaceholder}>
                        <input type="file" name="file" id="file" value={inputFile} multiple onChange={importOnChange}/>
                        <label htmlFor="file" className="lb-file-input">ファイルを選択</label>
                    </div>
                    <div className="action">
                        <button className="btn btn-import" onClick={submitImport}>取り込み</button>
                    </div>
                </div>
                <div className="group info-top flex-c">
                    <div className="info-text">
                        <b>データ取り込み方法：</b>
                    </div>
                    <div className="info-text">・ステップ1:商品一覧ファイルはKSouba[ページ番号].jsをインポートします。</div>
                    <div className="info-text">・ステップ2: 在庫数のファイル番号はZaiko[ページ番号].jsをインポートします。</div>
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
                </div>
                <ListItemProducts listItems={dataImport} isOrder={false} />
            </div>}
            {(!sigIn)&&<div className={`modal modal-login flex-c ${showModalLogin? 'show' : ''}`}>
                <div className="block-modal">
                    <div className={`controll flex-c ${formError.email? 'error' : ''}`}>
                        <input type="text" id="user" name='email' required onBlur={handlControllOnBlur} onChange={handlControllOnChange} value={form.name}/>
                        <label htmlFor="user">メールアドレス</label>
                    </div>
                    <div className={`controll flex-c ${formError.password? 'error' : ''}`}>
                        <input type="password" id="password" name='password' required onBlur={handlControllOnBlur} onChange={handlControllOnChange} value={form.password}/>
                        <label htmlFor="password">パスワード</label>
                    </div>
                    <div className="action flex-r">
                        <button className="cancel" onClick={handlCancel}>キャンセル</button>
                        <button className="sign-in" onClick={handlSignIn}>ログイン</button>
                    </div>
                </div>
            </div>}
            <div className={`modal modal-import flex-c ${showModalImport?'show':''}`}>
                <div className="block-modal">
                    <div className="controll flex-c">
                        <h3>{message}</h3>
                    </div>
                    <div className="action flex-r">
                        <button className="btn close" onClick={()=>setShowModalImport(false)}>近い</button>
                    </div>
                </div>
            </div>
        </Layouts>
	)
}

export default ImportResult