export const setFormatDate = (text: string|Array<string> , format: string, addDate: number): Array<string>|string|undefined=> {
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + addDate)
    if (typeof text == 'string') {
        if (format == 'YYYY年') {
            let repText = `${currentDate.getFullYear()}年`
            return text.replace(format, repText)
        }
        if (format == 'YYYY年MM月') {
            let repText = `${currentDate.getFullYear()}年${currentDate.getMonth()}月`
            return text.replace(format, repText)
        }
        if (format == 'MM月DD日') {
            let repText = `${currentDate.getMonth()}月${currentDate.getDate()}日`
            return text.replace(format, repText)
        }
    } else {
        if (format == 'YYYY年') {
            let repText = `${currentDate.getFullYear()}年`
            return text.map(i=>{
                return i.replace(format, repText)
            })	
        }
        if (format == 'YYYY年MM月') {
            let repText = `${currentDate.getFullYear()}年${currentDate.getMonth()}月`
            return text.map(i=>{
                return i.replace(format, repText)
            })	
        }
        if (format == 'MM月DD日') {
            let repText = `${currentDate.getMonth()}月${currentDate.getDate()}日`
            return text.map(i=>{
                return i.replace(format, repText)
            })	
        }
    }
}
export const subStringJP = (string: string, start: number, end: number, strDot: string = ''): string => {
    let enc = new TextEncoder()
    let text = []
    let arrText = string.split('')
    let index = 0
    while (start <= end) {
        let element = arrText[index]
        let uint8 = enc.encode(element)
        if (uint8.length==1) {
            start++
            text.push(element)
        } else {
            start = start + 2
            text.push(element)
        }
        index++
    }
    return text.join('') + (index < string.length?strDot:'')
}