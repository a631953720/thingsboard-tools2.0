/* eslint-disable no-console */
import path from 'path';
import dotenv from 'dotenv';

// 分為兩種不同的env檔案 1.development 2.production
// 在package.json script裡面設定
dotenv.config({
    path: path.resolve(__dirname, `../config/${process.env.NODE_ENV}.env`),
});

export const SERVER = {
    port: process.env.PORT || '3000',
    isDebug: process.env.DEBUT === 'true',
};

export const TB_SERVER = {
    ip: process.env.TB_SERVER_IP || '127.0.0.1',
    port: process.env.TB_SERVER_PORT || '80',
};

export const TB_USER = {
    systemAdminEmail: process.env.TB_ADMIN_EMAIL || 'sysadmin@thingsboard.org',
    systemAdminPassword: process.env.TB_ADMIN_PASSWORD || 'sysadmin',
    tenantAdminName: process.env.TENANT_ADMIN_NAME || 'thingsboard-tools-tenant-admin',
    tenantName: process.env.TENANT_NAME || 'thingsboard-tools-tenant',
    tenantEmail: process.env.TENANT_EMAIL || 'test@gmail.com',
};

if (process.env.NODE_ENV === 'development') {
    console.log('project env: ', {
        mode: process.env.NODE_ENV,
        SERVER,
        TB_SERVER,
        TB_USER,
    });
} else {
    const stringLength = TB_USER.systemAdminPassword.length;
    const hideString = String('*').repeat(stringLength);
    console.log('project env: ', {
        mode: process.env.NODE_ENV,
        SERVER,
        TB_SERVER,
        TB_USER: {
            ...TB_USER,
            systemAdminPassword: TB_USER.systemAdminPassword.replace(/.*/i, hideString),
        },
    });
}
