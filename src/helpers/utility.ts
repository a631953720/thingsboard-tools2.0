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
    return Number(v.toFixed(2));
  }
  return Number((Math.random() * params).toFixed(2));
}

export function handleTestTime(start: number, end: number) {
  if (start > end) return 0;
  const v = end - start;
  return Number.isNaN(v) ? 0 : v;
}

export function convertTimeToString(time: number) {
  const s = time / 1000;
  if (s < 60) return `${s} s`;

  const min = s / 60;
  if (min < 60) return `${Math.floor(min)} min ${Math.floor(s % 60)} s`;

  const hr = min / 60;
  if (hr < 24) return `${Math.floor(hr)} hr ${Math.floor(min % 60)} min ${Math.floor(s % 60)} s`;

  const d = hr / 24;
  return `${Math.floor(d)} day ${Math.floor(hr % 24)} hr ${Math.floor(min % 60)} min ${Math.floor(s % 60)} s`;
}

export function DateToMMDD(date: number) {
  const newDate = new Date(date);
  if (newDate.toString() === 'Invalid Date') return 'Invalid Date';
  const m = (newDate.getMonth() + 1).toString();
  const d = newDate.getDate().toString();
  const mm = m.length < 2 ? `0${m}` : m;
  const dd = d.length < 2 ? `0${d}` : d;
  return `${mm}-${dd}`;
}

export function DateFormat(date: string) {
  const newDate = new Date(date);
  if (newDate.toString() === 'Invalid Date') return 'Invalid Date';
  const yyyymmdd = newDate.toISOString().split('T')[0].replace(/-/gm, '/');
  const h = newDate.getHours().toString();
  const m = newDate.getMinutes().toString();
  const s = newDate.getSeconds().toString();
  const hh = h.length < 2 ? `0${h}` : h;
  const mm = m.length < 2 ? `0${m}` : m;
  const ss = s.length < 2 ? `0${s}` : s;
  return `${yyyymmdd} ${hh}:${mm}:${ss}`;
}
