import dotenv from 'dotenv'
import path from 'path'

if (process.env.TS_NODE_DEV) {
    let pathEnv = path.resolve('./.env.dev')
    dotenv.config({
        path: pathEnv
    })
} else {
    dotenv.config()
}
export default {
    NODE_DEV: process.env.TS_NODE_DEV,
    PORT: process.env.PORT,
    API_URL: process.env.API_URL,
    DOMAIN: process.env.DOMAIN,
    PROTOCOL: process.env.PROTOCOL,
    PSPHRASE: process.env.PSPHRASE,
    PG_CONNETNAME:  process.env.PG_CONNETNAME,
    PG_HOST: process.env.PG_HOST,
    PG_PORT: process.env.PG_PORT,
    PG_DB_NAME: process.env.PG_DB_NAME,
    PG_USER: process.env.PG_USER,
    PG_PASSWORD: process.env.PG_PASSWORD,
    PG_TIME_OUT: process.env.PG_TIME_OUT,
    PG_MAX: process.env.PG_MAX,
    PG_TIMEZONE: process.env.PG_TIMEZONE,
    ML_HOST: process.env.ML_HOST,
    ML_PORT: process.env.ML_PORT,
    ML_USER: process.env.ML_USER,
    ML_PASSWORD: process.env.ML_PASSWORD,
    ML_MAIL: process.env.ML_MAIL,
    CL_URL: process.env.CL_URL,
    ML_REFESH_TOKEN: process.env.ML_REFESH_TOKEN,
    ML_CLIEN_ID: process.env.ML_CLIEN_ID,
    ML_SECRET: process.env.ML_SECRET,
    ML_REDIRECT_URL: process.env.ML_REDIRECT_URL,
    ML_ADMIN: process.env.ML_ADMIN,
    STORAGE: {
        SUB_PATH: 'storages',
        MAX_SIZE: 1024*1024*45,
        PATH: {
            IMP: '/import',
            ORT: '/orther',
        }
    },
    TYPE_PRODUCT: {
        SALE: 'sale',
        NOTE: 'note'
    },
    SUB_PATH: __dirname.replace('config', ''),
    SAFT: process.env.SAFT?? 8,
    PUBLIC_KEY: `-----BEGIN PUBLIC KEY-----
    MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAkzlVgEQHyrLDo/uo5FVh
    NqZ5CI9byAh1SsARPrYoK1sTjBE9mA2cTtB93Y7FCE/CTqSCuYeLYTA4hqaD5cH6
    fRDE4JPLGA7IMuZk18/0IqnZp44piU0BGllhHHatb8FXGdyKaJTUQfOlAlTOG767
    9luSZLJgc8WEbD/DwTwK/Cy94V5BaNxSghlIKRNi1SxeixQqv0O2i0J5cJsoLjRu
    4BC2PyQzabCohQ9QR7R1q5KRgPyzip3vBKfeLDgCPzl+lW8gj6GBq9jJfbqaXEGt
    8jekH6tiBQ+88LUjixo3tH1u/61BwrG7BIY3VxgzjIOH2NN8H2M+T2DBOx0XdP7O
    1Sl3BEKrKkbw45LBUaIjHrOh4RLewDS81stt1FTpkf7cV1L+2T+jYdgN3lcJDoHK
    07gFMmrfbAGE02OpXlifIph1NdwzzzTBVCTSiiMQ7df0FCfaCdjzLDg7qAOcPtEk
    Rfag/4Bly1Fe/neSG8qCKD3cvGYx8XwMaRJn/cdxX1NAQyme028tiBIH//lGJx0K
    Vbt8c7+L9ZT+Q9muWkP0qZyyZmJtMl0zo5gC2JjSN1jQQRkIfCxiEVaTpdqHVDiD
    p0NjuxHwnie07UIF4jcYXrhf+nrtu7YbOwQTJh4bQrSP/Tb96dpQerpXRq8Wpqnp
    5xr5i2wGPhUOSl8SM3smhQUCAwEAAQ==
    -----END PUBLIC KEY-----`,
    PRIVATE_KEY: `-----BEGIN RSA PRIVATE KEY-----
    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
    -----END RSA PRIVATE KEY-----`,
    ACCESS_TOKEN_TTL: '15m',
    REFRESH_TOKEN_TTL: '1y',
    OPTION_COKIE: {
        maxAge: 24*60*60*1000, // 1 ngay
        secure: (process.env.IS_SECURE == '1'), 
        httpOnly: true,
        domain: process.env.API_URL
    },
    TOKEN_ACCESS: '_23T',
    TOKEN_REFRESH: '_24T'
}