class Rules {
    // string:'The :attribute must be a string.',
    string(value:any):boolean{
        return typeof value === 'string'
    }
    // numeric:'The :attribute must be a number.',
    numeric(value:any):boolean{
        return /^\d*$/.test(value)
    }
    // array:'The :attribute must be an array.',
    array(value:any):boolean{
        return Array.isArray(value)
    }
    // between:'The :attribute must be between :arg0 and :arg1',
    between(value:number, arg0:number, arg1:number){
        return (value >= arg0 && value <= arg1)
    }
    // date:'The :attribute must be a valid date.',
    // dateiso:'The :attribute must be a valid ISO-8601(yyyy-mm-dd) date.',
    dateiso(value:any):boolean{
        let reg =  /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
        let date = new Date(value)
        if (date&&reg.test(value)) {
            let cr = new Date()
            let offset = cr.getTimezoneOffset()
            let day = new Date(date.getTime() - (offset*60*1000)).toISOString().slice(0, 10).split('-')[2]
            return date.getDate() == parseInt(day)
        }
        return false
    }
    // email:'The :attribute must be a valid email address.',
    email(value:any):boolean{
        let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return reg.test(value.toLowerCase())
    }
    // max:'The :attribute can not be greater than :arg0.',
    max(value:number, arg:number):boolean{
        return value <= arg
    }
    // min:'The :attribute must be at least :arg0.',
    min(value:number, arg:number):boolean{
        return value >= arg
    }
    // maxLength:'The :attribute can not be greater than :arg0.',
    maxLength(value:string|Array<any>, arg:number):boolean{
        return value.length <= arg
    }
    // minLength:'The :attribute can not be less than :arg0.',
    minLength(value:string|Array<any>, arg:number):boolean{
        return value.length >= arg
    }

    // equals:'The :attribute must be a equals :arg0.',
    equals(value:string|number, arg:string|number):boolean{
        return value==arg
    }
    // confirmed:'The :attribute confirmation does not match.',
    confirmed(value:string|number, arg:string|number):boolean{
        return value==arg
    }
    // mime:'The :attribute must be a file of type::args.',
    mime(value:string, arg:string):boolean{
        let extValue = value.split('.')[1]
        let extArr = arg.split('|')
        return extArr.indexOf(extValue)>=0 
    }
    // checked: 'The :attribute field must be checked.',
    checked(value:string|boolean|number):boolean{
        return 1 === value || "on" === value || !0 === value || "true" === value 
    }
    // required: 'The :attribute field is required.',
    required(value:any):boolean{
        return (value.toString()!='')&&(value!=undefined)&&(value!=null)
    }
    // phoneNumber: 'The :attribute must be a valid phone number.',
    phoneNumber(value:string):boolean{
        return /^(0)?(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)
    }
    custorm(callback:Function, value?:any, arg?:object):boolean{
        if (value&&arg) {
            return callback(value,arg)
        }
        if (value) {
            return callback(value)
        }
        return callback()
    }
}

export default Rules