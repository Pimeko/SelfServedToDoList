FROM node:18

WORKDIR /app

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY front/ ./front/

COPY back/ ./back/
RUN cd back && npm install
 
EXPOSE 2696
CMD ["node", "back/app.js"]
