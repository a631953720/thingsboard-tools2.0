import mqtt, { MqttClient } from 'mqtt';
import { TB_SERVER } from '../../../constants/env';
import { simpleMsg } from '../../../helpers/loggers';
import { delayInterval } from '../../../helpers/utility';
import { jsonParse, jsonStringify } from '../../../helpers/jsonHandler';
import MQTTClientEntity from './clients';
import { Actions } from '../../../interface/serviceRequest/device/setTBDeviceActionDTO';
import Mock from '../../mockData';
import MockDataEntity from '../../../library/mockData/mockDataEntity';

const MQTTClients = new MQTTClientEntity();

type Device = {
  id: string;
  name: string;
  token: string;
  type: string;
  action?: Array<Actions>;
};

function initConnect(name: string, token: string) {
  const client = mqtt.connect(`mqtt://${TB_SERVER.mqttHost}`, {
    username: token,
  });

  client.once('connect', () => {
    simpleMsg(`${name} connected`);
  });

  client.once('error', (error) => {
    simpleMsg(`${name} can't connect: ${error}`);
    client.end();
  });

  return client;
}

export default class TBDeviceEntity {
  private device: Device;

  private sendDataDelay: number;

  private client: mqtt.MqttClient | undefined;

  private timer?: ReturnType<typeof setInterval>;

  private historySendTimes: number;

  private sendTimes: number;

  private createTime: number;

  private startTime?: number;

  private endTime?: number;

  private firstToInitOnMessage: boolean;

  // 能找到匹配的假資料產生實體，就設定為true
  private canMapMockDataEntity: boolean;

  private mockDataEntity?: MockDataEntity;

  constructor(device: Device, sendDataDelay: number) {
    this.device = device;
    this.sendDataDelay = sendDataDelay;
    this.firstToInitOnMessage = true;
    this.sendTimes = 0;
    this.historySendTimes = 0;
    this.createTime = new Date().getTime();

    const find = MQTTClients.getClient(this.device.id);
    if (find) {
      simpleMsg(`${this.device.name} is already connected`);
      this.client = find;
    } else {
      this.client = initConnect(this.device.name, this.device.token);
      MQTTClients.addClient({ [this.device.id]: this.client });
    }

    const entity = Mock.getMockDataEntity(this.device.type);
    if (!entity) this.canMapMockDataEntity = false;
    else this.canMapMockDataEntity = true;
  }

  /**
   * 更新實體狀態，是否可配對到對應的 MockDataEntity
   */
  public updateSendDataFlag() {
    const mock = Mock.getMockDataEntity(this.device.type);
    if (mock) {
      this.mockDataEntity = mock;
      this.canMapMockDataEntity = true;
      return true;
    }
    this.canMapMockDataEntity = false;
    return false;
  }

  /**
   * @returns 跟裝置有關的資訊
   */
  public getInfos() {
    return {
      ...this.device,
      historySendTimes: this.historySendTimes,
      sendTimes: this.sendTimes,
      createTime: this.createTime,
      startTime: this.startTime,
      endTime: this.endTime,
      canMapMockDataEntity: this.canMapMockDataEntity,
      sendDataFrequency: this.sendDataDelay,
    };
  }

  /**
   * getCanMapMockDataEntity
   */
  public getCanMapMockDataEntity() {
    return this.canMapMockDataEntity;
  }

  /**
   * 取得此時體的MqttClient，若為 undefined 則是沒有連線
   * @returns MqttClient | undefined
   */
  public getClient() {
    return this.client;
  }

  /**
   * 取得當前裝置的行為
   * @returns device action
   */
  public getAction() {
    return this.device.action;
  }

  /**
   * 取得當前裝置的行為
   * @param action device action array
   */
  public updateAction(action?: Array<Actions>) {
    this.device.action = action;
  }

  private startToSendMockData(client: MqttClient) {
    const mock = this.mockDataEntity;
    if (mock) {
      this.sendTimes = 0;
      const id = delayInterval(this.sendDataDelay, () => {
        const rawData = jsonStringify(mock.generate());
        client.publish('v1/devices/me/telemetry', rawData, () => {
          simpleMsg(`${this.device.name} send data`);
          this.historySendTimes += 1;
          this.sendTimes += 1;
          this.endTime = new Date().getTime();
        });
      });
      this.timer = id;
      this.startTime = new Date().getTime();
    }
  }

  /**
   * 會嘗試尋找對應的MockDataEntity並設置發送資料的計時器
   * 若有對應會更新 canMapMockDataEntity 的屬性為true
   * 告知使用者此裝置可以發送訊息
   */
  public async setMQTTClientSendData() {
    const { client, timer } = this;
    if (timer) return;
    if (client) this.startToSendMockData(client);
  }

  private startToSubscribeRPCTopic(client: MqttClient) {
    const { device, firstToInitOnMessage } = this;
    simpleMsg(`${device.name} subscribe TB RPC topic`);
    client.subscribe('v1/devices/me/rpc/request/+');
    if (firstToInitOnMessage) {
      client.on('message', (topic, message) => {
        simpleMsg(`device: ${device.name}`);
        simpleMsg(`request.topic: ${topic}`);
        simpleMsg('request.body: ', jsonParse(message));

        const serverRPCMessage = jsonParse(message);
        const requestId = topic.slice('v1/devices/me/rpc/request/'.length);
        const responsePayload = jsonStringify({
          method: serverRPCMessage.method,
          params: {
            ...serverRPCMessage.params,
            isDone: true,
          },
        });

        // client acts as an echo service
        client.publish(`v1/devices/me/rpc/response/${requestId}`, responsePayload);
      });
    }
  }

  /**
   * 命令裝置訂閱RPC topic，若該裝置已經訂閱過則不再執行，並回傳false
   */
  public async subscribeRPCTopic() {
    const { client } = this;
    if (client) {
      this.startToSubscribeRPCTopic(client);
      this.firstToInitOnMessage = false;
    }
    return false;
  }

  /**
   * 清除計時器並清空timer的屬性
   */
  public async stopMQTTClientSendData() {
    const { timer } = this;
    if (timer) {
      clearInterval(timer);
      this.timer = undefined;
    }
  }

  /**
   * deleteSendDataAction
   */
  public deleteSendDataAction() {
    const { device } = this;
    this.updateAction(device.action?.filter((v) => v !== 'sendData'));
  }

  /**
   * 取消訂閱RPC topic
   */
  public async unsubscribeRPCTopic() {
    const { client } = this;
    if (client) {
      client.unsubscribe('v1/devices/me/rpc/request/+');
    }
  }

  /**
   * deleteSubscribeRPCAction
   */
  public deleteSubscribeRPCAction() {
    const { device } = this;
    this.updateAction(device.action?.filter((v) => v !== 'subscribeRPC'));
  }

  /**
   * 嘗試刪除MQTT Client，若找不到則不處理
   */
  public async removeMQTTClient() {
    const client = MQTTClients.getClient(this.device.id);
    if (client) {
      simpleMsg(`${this.device.name} disconnect`);
      client.end();
      MQTTClients.removeClient(this.device.id);
      this.client = undefined;
    }
  }

  /**
   * updateSendDataFrequency
   */
  public updateSendDataFrequency(time: number) {
    this.sendDataDelay = time;
  }

  /**
   * restartSendDataIfTimerExist
   */
  public restartSendDataIfTimerExist() {
    const { client, timer } = this;
    if (client && timer) {
      this.stopMQTTClientSendData();
      this.startToSendMockData(client);
    }
  }
}
