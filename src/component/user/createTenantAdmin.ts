import env from '../../constants/env';
import * as TBUserConnecter from '../../application/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';

const loggers = new WinstonLogger({ type: 'User component' });

export default async function createTenantAdmin(token: string) {
    const newTenantAdminInfo = await TBUserConnecter.createTenantAdmin(
        token,
        { title: env.TB_User.tenantAdminName },
    );
    const newTenantAdminId = newTenantAdminInfo.id.id;
    loggers.debug({ newTenantAdminInfo }, 'Create new tenant admin');
    return newTenantAdminId as string;
}
