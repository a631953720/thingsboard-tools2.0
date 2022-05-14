import UpsertMockDataEntityDTO from '../../interface/serviceResponse/device/upsertMockDataEntityDTO';
import WinstonLogger from '../../helpers/loggers';
import SetTBDeviceMockDataDTO from '../../interface/serviceRequest/device/setTBDeviceMockDataDTO';
import Mock from '../../library/mockData';
import DeleteMockDataEntityDTO from '../../interface/serviceResponse/device/deleteMockDataEntityDTO';

const loggers = new WinstonLogger({ type: 'Mock Data service' });

// eslint-disable-next-line import/prefer-default-export
export function createEntity(config: SetTBDeviceMockDataDTO) {
  const entity = Mock.createMockDataEntity(config.name, config.data);

  if (!entity) return new UpsertMockDataEntityDTO({ status: 400, errorMessage: 'Entity is exist' });

  const DTO = new UpsertMockDataEntityDTO({
    status: 201,
    name: config.name,
    config: entity.getConfig(),
  });
  loggers.debug({ DTO }, 'createEntity');
  return DTO;
}

export function updateEntity(config: SetTBDeviceMockDataDTO) {
  const entity = Mock.updateMockDataEntity(config.name, config.data);

  if (!entity) return new UpsertMockDataEntityDTO({ status: 404, errorMessage: 'Entity is not found' });

  const DTO = new UpsertMockDataEntityDTO({
    status: 200,
    name: config.name,
    config: entity.getConfig(),
  });
  loggers.debug({ DTO }, 'updateEntity');
  return DTO;
}

export function deleteEntity(name: string) {
  const isDelete = Mock.deleteMockDataEntity(name);

  if (!isDelete) return new DeleteMockDataEntityDTO({ status: 404, errorMessage: 'Entity is not found' });

  const DTO = new DeleteMockDataEntityDTO({ status: 200 });
  loggers.debug({ DTO }, 'deleteEntity');
  return DTO;
}
