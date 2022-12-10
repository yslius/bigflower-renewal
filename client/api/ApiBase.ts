import config from 'config'

const api = () =>{
    const baseURL = config.API_URL
    const defaults:any = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        credentials: 'include'
    }
    const setBody = (body:any) => {
        defaults.body = body
    }
    const getURL = (url = '') =>{
        return baseURL + url
    }
    const setMethod = (method = 'GET') =>{
        defaults.method = method
    }
    const setConfig = (config = {}) => {
        Object.assign(defaults, config)
    }
    const useFetch = (url: string) => {
        return fetch(url, defaults)
        .then((result) => {
            return result.json()
        }).catch((err) => {
            console.log(JSON.parse(err))
        });
         
    }
    const GET = (url: string, config = {}) => {
        url = getURL(url)
        setMethod('GET')
        setConfig(config)
        delete defaults.body 
        return useFetch(url)
    }
    const POST = (url: string, body: any, config = {}) => {
        url = getURL(url)
        setMethod('POST')
        setBody(body)
        setConfig(config)
        return useFetch(url)
    }
    const PUT = (url: string, body: any, config = {}) => {
        url = getURL(url)
        setMethod('PUT')
        setBody(body)
        setConfig(config)
        return useFetch(url)
    }
    const DELETE = (url: string, config = {}) => {
        url = getURL(url)
        setMethod('DELETE')
        setConfig(config)
        return useFetch(url)
    }
    return {
        GET,
        POST,
        PUT,
        DELETE
    }
}

export default api()