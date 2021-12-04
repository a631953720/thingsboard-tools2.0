import env from '../../constants/env';
import * as TBUserConnecter from '../../application/thingsboardConnecter/user';
import WinstonLogger from '../../helpers/loggers';
import checkAxiosError from '../../helpers/checkAxiosError';

const loggers = new WinstonLogger({ type: 'User component' });

export default async function createTenantAdmin(token: string) {
    const newTenantAdminInfo = await TBUserConnecter.createTenantAdmin(
        token,
        { title: env.TB_User.tenantAdminName },
    );

    if (checkAxiosError(newTenantAdminInfo)) {
        loggers.error('Create Tenant error', 'Create new tenant');
        return '';
    }

    const newTenantAdminId = newTenantAdminInfo.id.id;
    loggers.debug({ createTenantAdminName: newTenantAdminInfo.name }, 'Create new tenant admin');
    return newTenantAdminId as string;
}
