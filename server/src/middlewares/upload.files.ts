import multer from 'multer'
import config from 'config'

const STORAGE = config.get<any>('STORAGE')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, STORAGE.SUB_PATH) 
    }, 
    filename: (req, file, cb) => {
        let arrType = file.originalname.split('.')
        let name = `${arrType[0]}_${Date.now()}`
        let extents = arrType[arrType.length - 1] =='js'? 'ts': arrType[arrType.length - 1]
        let pathFile = (extents == 'js' || extents == 'ts') ? STORAGE.PATH.IMP : STORAGE.PATH.ORT
        cb(null, `${pathFile}/${name}.${extents}`)
        file.path = `${STORAGE.SUB_PATH}${pathFile}/${name}.${extents}`
    },
})
const UPLOAD_FILES = multer({
    storage: storage,
    limits: { fileSize: STORAGE.MAX_SIZE },
})

export default UPLOAD_FILES