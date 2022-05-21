# Thingsboard tools 2.0

---

## Description

1. This repository is the thingsboard-tools v2, if you're looking for the thingsboard-tools v1 [Click here](https://github.com/a631953720/thingsboard-tools)

2. This project is under development. If you are looking for a stable version of this project, please use the v1 version.

3. No CLI (command line) support yet, if you don't want to execute this project as a web service or you need the CLI tools for this project, please use the v1 version.

4. For more system architecture of this project, a Notion public page is provided [Click here](https://faint-comet-8c5.notion.site/d88dde02820a4628adc03b4c76e35563)


## Features

This project provides API service, you can do the following features:

   - Get the tenant token of the thingsboard.
       - By default, this project uses the following user account to login into the thingsboard.
       
         ```text
          # User name
          sysadmin@thingsboard.org
          
          # Password
          sysadmin
         ```

       - After this tool login successfully, will check the tenant list under this account and find the specified tenant user, and try to get the JWT token of the specified tenant user, this tenant user information can be modified in `.env` file.
       
   - Add / Remove virtual device onto the thingsboard.
       - Add virtual device(s) onto the thingsboard by APIs, and you can get device information.
   - Control the virtual device behavior, like the RPC command, and send data onto the thingsboard.
      - Control virtual device(s) behavior, now support: 
           - Send data to the thingsboard
           - Subscribe RPC topic of the thingsboard
   - And more... (under developing)

## Use case

Improving your development efficiency on re-development of the thingsboard platform.

1. Get the tenant token of thingsboard easier.
2. Need some virtual device onto the thingsboard, and you can control virtual device(s) behavior.
3. Dynamic setting the virtual device action.


## Requirements
 - Node.js
 - Thingsboard


## Variables
`.env` file sample are located at `src/config` folder
```shell
# Application setup
PORT=3000
DEBUT=true

# Thingsboard server IP or container name
TB_SERVER_HOST=127.0.0.1:1618
TB_MQTT_HOST=127.0.0.1:1883

# Thingsboard server
TB_ADMIN_EMAIL=sysadmin@thingsboard.org
TB_ADMIN_PASSWORD=sysadmin

TENANT_ADMIN_NAME=thingsboard-tools-tenant-admin
TENANT_NAME=thingsboard-tools-tenant
TENANT_EMAIL=test@gmail.com
```

## Running this application

- Install dependencies

  ```shell
   npm i
  ```

- Modify the variable

- Execute this tool

  ```shell

   # Production
   npm run start
   
   # Dev
   npm run start:dev
  ```


## Testing

We provide the POSTMAN collection file for testing, the swagger document will provide in the future version.

## TODO

- [x] Customize the data format for virtual device upload data. (High priority)
- [ ] And more...
