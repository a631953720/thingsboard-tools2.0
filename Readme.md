# Overview
## 簡述
1. 此工具為thingsboard-tools的第二版本，[點我前往 thingsboard-tools github](https://github.com/a631953720/thingsboard-tools)
2. 此工具仍在開發階段，功能尚未完成
3. 此工具提供API的服務，透過API可以使用下列功能:
    - 取得tenant token
    - 新增/刪除虛擬裝置
    - 修改虛擬裝置行為 (subscribeRPC or sendData)
4. 目前尚未提供CLI的執行方式，若不想執行成一支Service，可以使用thingsboard-tools第一個版本
5. 有關設計細節，我有一個[公開的notion可供參考](https://faint-comet-8c5.notion.site/d88dde02820a4628adc03b4c76e35563)

## 你可以用來做甚麼?
1. 不需手動登入來取得tenant token，二次開發的過程中常常會需要這token貼在程式碼內做測試。
2. 想要有虛擬裝置上傳資料或是接收RPC請求，可以透過API設定哪些裝置要做什麼行為，這樣二次開發會有些擬真的裝置可以參考


# What does this tool solve?
## 1. 自動登入sysadmin帳號並嘗試取得tenant token
預設情況下，此工具會透過下列帳號去嘗試登入
```
sysadmin@thingsboard.org
sysadmin
```
當此工具登入成功後，會嘗試搜尋此帳號的Tenants，若成功搜尋到，會接著尋找特定的Tenant帳號，並嘗試取得tenant jwt token。可以修改.env的環境變數來改變搜尋的對象。

## 2. 新增/刪除虛擬裝置到TB
可透過API新增虛擬裝置，成功新增裝置後會回傳所有的裝置資訊，也可以透過API刪除多台裝置。

## 3. 設定虛擬裝置的行為
可以透過API設定虛擬裝置的行為，目前支援兩種行為: 1. 上傳資料 2. 訂閱RPC topic。

## 4. Coming soon~
此工具還在開發階段，若有新的功能會更新此文件


# Before using this tool
## 1. Install package
```
npm i
```

## 2. Set env file
`src/config`內有兩種範例檔案可供修改，可根據自身需求修改參數
```
# 此專案執行設定
PORT=3000
DEBUT=true

# TB Server所在位置
TB_SERVER_IP=127.0.0.1
TB_SERVER_PORT=1618

# TB 帳號相關設定
TB_ADMIN_EMAIL=sysadmin@thingsboard.org
TB_ADMIN_PASSWORD=sysadmin

TENANT_ADMIN_NAME=thingsboard-tools-tenant-admin
TENANT_NAME=thingsboard-tools-tenant
TENANT_EMAIL=test@gmail.com
```

## 3. 執行專案
```
npm run start
```
or
```
npm run start:dev
```


# 目前提供的測試方式 (postman)
`TB_APIs.postman_collection.json` 是我在測試API的postman設定，由於目前尚未新增swagger，暫時只能使用postman匯出的檔案提供API測試。

# 預計更新項目
1. 自訂上傳裝置的資料結構 (優先)
2. device API 更加完整
3. 其他更多的功能

<!-- ## 3. APIs

### 1. POST create devices
會根據輸入的設定自動新增裝置到TB，會以流水號的方式新增裝置，ex: deviceName-0 deviceName-1 ...

body: 
```
{
    "deviceCount": number,
    "deviceName": string,
    "deviceType": string
}
```

### 2. DEL delete devices
會根據輸入的參數刪除特定裝置

body:
```
"deviceList": [
    {
        "id": string
    },
]
```
or
```
"deviceList": ["string"]
```

### 3. GET get devices
目前不需要帶入參數

### 4. POST set device action
會根據輸入的參數修改裝置的行為，若此裝置沒有連線到TB，就會建立連線，action若為空陣列則是只保持連線，甚麼事情都不做

```
"deviceList": [
    {
        "name": string,
        "id": string,
        "token": string,
        "action": Array<"subscribeRPC" | "sendData">
    }
]
```

### 5. GET autoLoginTenant
目前不需要帶入參數 -->
