#Infor System
    Node JS v14.15.5
    React JS use lib NextJS, SCSS,..
    PostgreSql v10
#Install 
    cd /client
        - npm i
        - check and change file .env
        - build code: npm run build
        - start server: npm run start
    cd /server
        - npm i
        - check and change file .env
        - init database >psql -U postgres -d big_flowers -f D:\Code\BigFlower\server\src\migrates\init.sql
        - build code: npm run build
        - start server: npm run start
        - Install SSL: We need OpenSSL
            + For windows: https://slproweb.com/products/Win32OpenSSL.html
            + For MacOS: https://showboxfreeapp.org/openssl-for-mac/
            + CLI:  openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
                    openssl rsa -in key.pem -out key-rsa.pem
    
    #Config RSA key:
            ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
            # Don't add passphrase
            openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
            cat jwtRS256.key
            cat jwtRS256.key.pub