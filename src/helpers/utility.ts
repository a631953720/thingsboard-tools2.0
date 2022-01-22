/* eslint-disable import/prefer-default-export */
type TypeList =
    | 'bigint'
    | 'boolean'
    | 'function'
    | 'number'
    | 'object'
    | 'string'
    | 'symbol'
    | 'undefined';

export function checkValueType(value: any, type: TypeList) {
    // eslint-disable-next-line valid-typeof
    return typeof value === type;
}
