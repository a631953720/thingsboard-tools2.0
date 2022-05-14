FROM node:14

WORKDIR /TB-tools

COPY . .

RUN cd src/config && \
echo PORT=8080 >> production.env && \
echo DEBUT=false >> production.env && \
echo TB_SERVER_IP=127.0.0.1 >> production.env && \
echo TB_SERVER_PORT=1618 >> production.env && \
echo $TB_ADMIN_EMAIL >> production.env && \
echo $TB_ADMIN_PASSWORD >> production.env && \
echo TENANT_ADMIN_NAME=thingsboard-tools-tenant-admin >> production.env && \
echo TENANT_NAME=thingsboard-tools-tenant >> production.env && \
echo TENANT_EMAIL=test@gmail.com >> production.env && \
echo DEVICE_NAME='test' >> production.env && \
echo DEVICE_TYPE='test' >> production.env && \
echo DEVICE_LABEL='test' >> production.env

RUN npm i && npm run build

CMD ["npm", "start"]

EXPOSE 8080