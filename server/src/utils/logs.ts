import logger from 'pino'

const logs = logger({
    transport: {
        targets: [
            {
                level: 'info',
                target: 'pino-pretty',
                options: {
                    translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
                    ignore: "pid,hostname",
                }
            }, 
            {
                level: 'error',
                target: 'pino-pretty',
                options: { 
                    destination: `./storages/logs/logs.log`,
                    mkdir: true,
                    translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
                    ignore: "pid,hostname",
                    filters: 'error.log'
                }
            },
            {
                level: 'warn',
                target: 'pino-pretty',
                options: { 
                    destination: `./storages/logs/logs.log`,
                    mkdir: true,
                    translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
                    ignore: "pid,hostname",
                    filters: 'warn.log'
                }
            },
            {
                level: 'debug',
                target: 'pino-pretty',
                options: {
                    destination: `./storages/logs/logs.log`,
                    mkdir: true,
                    translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
                    ignore: "pid,hostname",
                    filters: 'debug.log'
                }
            },
            {
                level: 'trace', 
                target: 'pino-pretty',
                options: {
                    destination: `./storages/logs/logs.log`,
                    mkdir: true,
                    translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
                    ignore: "pid,hostname",
                    filters: 'trace'
                }
            }
        ]
    }
})
export default logs