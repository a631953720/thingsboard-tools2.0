type TypeList = 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';

export function checkValueType(value: any, type: TypeList) {
  // eslint-disable-next-line valid-typeof
  return typeof value === type;
}

export function checkArrayValueType({ array, key, type }: { array: any[]; key?: string; type?: TypeList }) {
  // 元素為真
  if (!type && !key) return array.every((v) => v);
  // 元素的某屬性為真
  if (!type && key) return array.every((v) => v[key]);
  // 元素的類型
  if (type && !key) return array.every((v) => checkValueType(v, type));
  // 元素的某屬性類型
  if (type && key) return array.every((v) => checkValueType(v[key], type));

  throw new Error('checkArrayValueType error');
}

export function delay(time: number, callback = () => {}) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((res, _rej) => {
    setTimeout(() => {
      if (typeof callback === 'function') callback();
      res(1);
    }, time * 1000);
  });
}

export function delayInterval(time: number, callback = () => {}) {
  return setInterval(callback, time * 1000);
}

export function randomNum(params: number, max?: number, min?: number) {
  if (typeof max === 'number' && typeof min === 'number') {
    let v = Math.random() * params;
    if (v > max) v = max;
    if (v < min) v = min;
    return v;
  }
  return Math.random() * params;
}
