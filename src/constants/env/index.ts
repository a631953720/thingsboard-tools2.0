/* eslint-disable no-console */
import path from 'path';
import dotenv from 'dotenv';

// 分為兩種不同的env檔案 1.development 2.production
// 在package.json script裡面設定
dotenv.config({
    path: path.resolve(__dirname, `../../../${process.env.NODE_ENV}.env`),
});

const env = {
    Server: {
        port: process.env.PORT || '3000',
        isDebug: process.env.DEBUT === 'true',
    },
    TB: {
        ip: process.env.TB_SERVER_IP || '127.0.0.1',
        port: process.env.TB_SERVER_PORT || '80',
    },
    TB_User: {
        systemAdminEmail: process.env.TB_ADMIN_EMAIL || 'sysadmin@thingsboard.org',
        systemAdminPassword: process.env.TB_ADMIN_PASSWORD || 'sysadmin',
        tenantAdminName: process.env.TENANT_ADMIN_NAME || 'thingsboard-tools-tenant-admin',
        tenantName: process.env.TENANT_NAME || 'thingsboard-tools-tenant',
        tenantEmail: process.env.TENANT_EMAIL || 'test@gmail.com',
    },
};

console.log('project mode: ', process.env.NODE_ENV);
console.log('project env: ', env);

export default env;
