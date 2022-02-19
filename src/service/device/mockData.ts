import UpsertMockDataEntityDTO from '../../interface/serviceResponse/device/upsertMockDataEntityDTO';
import WinstonLogger from '../../helpers/loggers';
import SetTBDeviceMockDataDTO from '../../interface/serviceRequest/device/setTBDeviceMockDataDTO';
import Mock from '../../library/mockData';

const loggers = new WinstonLogger({ type: 'Mock Data service' });

// eslint-disable-next-line import/prefer-default-export
export function createMockDataEntity(config: SetTBDeviceMockDataDTO) {
    const entity = Mock.createMockDataEntity(config.name, config.data);

    if (!entity) return new UpsertMockDataEntityDTO({ status: 400, errorMessage: 'Entity is exist' });

    const DTO = new UpsertMockDataEntityDTO({
        status: 201,
        name: config.name,
        config: entity.getConfig(),
    });
    loggers.debug({ DTO }, 'createMockDataEntity');
    return DTO;
}

// export function updateEntity(config: SetTBDeviceMockDataDTO) {

// }

// export function deleteEntity(params:type) {

// }
