// entityType: [ASSET, ALARM, WIDGETS_BUNDLE, DASHBOARD, RULE_NODE, DEVICE, TENANT, USER, CUSTOMER, ENTITY_VIEW, WIDGET_TYPE, RULE_CHAIN]
export type EntityFindPayload = {
  entityFilter: {
    type: 'entityList';
    resolveMultiple: boolean;
    entityType: 'DEVICE' | 'ASSET';
    entityList: string[];
  };
  pageLink: {
    page: number;
    pageSize: number;
    textSearch?: string;
    dynamic?: boolean;
    sortOrder?: {
      key: {
        key: string;
        type: string;
      };
      direction: 'ASC';
    };
  };
  entityFields: Array<{
    type: 'ENTITY_FIELD';
    key: 'name' | 'label' | 'additionalInfo';
  }>;
  latestValues: Array<{
    type: 'ATTRIBUTE' | 'TIME_SERIES';
    key: string;
  }>;
};

export type EntityFindReq = {
  entityType: 'DEVICE' | 'ASSET';
  entityList: string[];
  pageLink: EntityFindPayload['pageLink'];
  entityFields: Array<'name' | 'label' | 'additionalInfo'>;
  latestValues: EntityFindPayload['latestValues'];
};

export type TBValueType = {
  ts: number;
  value: string;
};

export type EntityFindRes = {
  data: Array<{
    entityId: {
      entityType: 'DEVICE' | 'ASSET';
      id: string;
    };
    latest: {
      ENTITY_FIELD: Record<string, TBValueType>;
      ATTRIBUTE: Record<string, TBValueType>;
      TIME_SERIES: Record<string, TBValueType>;
    };
    // timeseries: {};
    errorMessage: any;
  }>;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
};

export type EntityFindDTO = {
  status: number;
  errorMessage?: any;
  entityIdList: string[];
  entityList: EntityFindRes;
};

export function createDTO(data: any): EntityFindDTO {
  return {
    status: data.status,
    errorMessage: data.errorMessage,
    entityIdList: data.data.map((v: any) => v.entityId.id),
    entityList: data,
  };
}

export function queryBuilder(config: EntityFindReq): EntityFindPayload {
  return {
    entityFilter: {
      type: 'entityList',
      resolveMultiple: true,
      entityType: config.entityType,
      entityList: config.entityList,
    },
    pageLink: config.pageLink,
    entityFields: config.entityFields.map((v) => ({
      type: 'ENTITY_FIELD',
      key: v,
    })),
    latestValues: config.latestValues,
  };
}
