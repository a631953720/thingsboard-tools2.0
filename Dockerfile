FROM node:14

WORKDIR /TB-tools

COPY . .

ENV DEBUT=false
ENV TB_PROXY_CONTAINER=haproxy-certbot
ENV TENANT_EMAIL=a631953720@GMAIL.COM
ENV TB_ADMIN_EMAIL=sysadmin@thingsboard.org
ENV TENANT_ADMIN_NAME=thingsboard-tools-tenant-admin
ENV TENANT_NAME=thingsboard-tools-tenant

RUN cd src/config && \
echo PORT=8080 >> production.env && \
echo ${DEBUT} >> production.env && \
echo TB_SERVER_HOST=${TB_PROXY_CONTAINER} >> production.env && \
echo TB_MQTT_HOST=${TB_PROXY_CONTAINER} >> production.env && \
echo TB_ADMIN_EMAIL=${TB_ADMIN_EMAIL} >> production.env && \
echo TB_ADMIN_PASSWORD=${TB_ADMIN_PASSWORD} >> production.env && \
echo TENANT_ADMIN_NAME=${TENANT_ADMIN_NAME} >> production.env && \
echo TENANT_NAME=${TENANT_NAME} >> production.env && \
echo TENANT_EMAIL=${TENANT_EMAIL} >> production.env && \
echo DEVICE_NAME='test' >> production.env && \
echo DEVICE_TYPE='test' >> production.env && \
echo DEVICE_LABEL='test' >> production.env

RUN npm i && npm run build

CMD ["npm", "start"]

EXPOSE 8080