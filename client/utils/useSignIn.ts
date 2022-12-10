import Users from 'api/Users'
import { useCallback, useEffect, useState } from 'react'



const useSignIn = (init: boolean = true): [boolean, Function, any, Function] =>{
    const [state, setState] = useState<boolean>(init)
    const [user, setUser] = useState<any>(null)
    useEffect(()=>{
        Users.infoUser()
        .then((result: any) => {
            if (result.status) {
                setState(true)
                setUser(result.data)
            } else {
                setState(false)
            }
        }).catch((err) => {
            setState(false)
        })
    },[])
    const setSignIn = (value: boolean) => {
        setState(value)
    }
    return [
        state,
        setSignIn,
        user, 
        setUser
    ]
}

export default useSignIn