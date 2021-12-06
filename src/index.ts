import express from 'express';
import { SERVER } from './constants/env';
import { simpleMsg } from './helpers/loggers';
import * as user from './service/user';

const app = express();
const { port } = SERVER;

app.get('/', (req, res) => {
    res.send('Hello, World!!');
});

app.listen(
    port,
    () => simpleMsg(`http server is running at port ${port}.`),
);

// 測試用程式碼
async function test() {
    const r = await user.getOrCreateNewTenantToGetToken();
    simpleMsg(r.tenantToken);

    const token = await user.getSystemAdminToken();
    // // const r = await user.createTenantAdmin(token, {
    // //     title: 'test123',
    // //     additionalInfo: { description: '123' },
    // //     email: '123@gmail.com',
    // //     country: 'Taiwan',
    // //     city: 'Taipei',
    // // });
    const tenantAdminId = await user.getFirstTenantAdminId(token, '');
    const tenantId = await user.getFirstTenantId(token, tenantAdminId, 'test');

    // // const r = await user.getTenantToken(token, tenantId);
    console.log(tenantAdminId);
    console.log(tenantId);
}

test();
