# Etapa 1: Build con Node.js (Actualizado a v22)
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./

# Instalación con el flag para evitar conflictos de peer dependencies
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servidor con Nginx
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa de build
COPY --from=build /app/dist/payphone-byron/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
