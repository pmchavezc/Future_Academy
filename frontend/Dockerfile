# Etapa 1: Construcción
FROM node:lts-alpine AS builder
WORKDIR /app

# Instala dependencias para cachear capas
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos y ejecuta la construcción
COPY . .
# Asumimos que 'npm run build' genera la carpeta 'dist' (común en Vite)
RUN npm run build


# Etapa 2: Servicio
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# CLAVE: Copia el contenido de la carpeta 'dist' desde la etapa 'builder'
# Si tu proyecto usa 'build', simplemente cambia 'dist' por 'build'.
COPY --from=builder /app/dist .

# Elimina el archivo de configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia una configuración básica para servir React
# ASUME: Tienes un archivo 'nginx.conf' en el mismo directorio.
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]