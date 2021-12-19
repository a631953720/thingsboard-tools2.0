import express from 'express';
import createDevice from '../library/thingsboardConnecter/device/createDevice';
import { autoLoginTenantAccount } from '../controller/user.controller';
import { autoLoginToGetTenantToken } from '../service/user';

const router = express.Router();

const test = {
    name: `string${Date.now()}`,
    type: 'string',
    label: 'string',
};

router.get('/test', async (req, res) => {
    const tenant = await autoLoginToGetTenantToken(req.headers.TBAdminToken as string);
    const r = await createDevice(tenant.token, test);
    res.json(r);
});

// 若tenant或是tenant admin不存在會自動create
router.get('/autoLoginTenant', autoLoginTenantAccount);

export default router;
