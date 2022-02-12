import express from 'express';
import { autoLoginTenantAccount } from '../controller/TBUser.controller';

const router = express.Router();

router.get('/test', (req, res) => {
    res.status(200).send('success');
});

// 若tenant或是tenant admin不存在會自動create
router.get('/autoLoginTenant', autoLoginTenantAccount);

export default router;
