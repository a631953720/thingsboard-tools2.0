/* eslint-disable no-console */
import path from 'path';
import dotenv from 'dotenv';

// 分為兩種不同的env檔案 1.development 2.production
// 在package.json script裡面設定
dotenv.config({
    path: path.resolve(__dirname, `../../../${process.env.NODE_ENV}.env`),
});

const ENV = {
    Server: {
        port: process.env.PORT,
        isDebug: process.env.DEBUT === 'true',
    },
};

console.log('project mode: ', process.env.NODE_ENV);
console.log('project ENV: ', ENV);

export default ENV;
