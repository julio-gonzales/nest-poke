<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo

1. Clonar el Repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```

5. clonar el archivo __.env.template__ y renombrar la copia a __.env__

6. llenar las variables de entorno en __.env__


7. Ejecutar seed
```
localhost:3000/api/v2/seed
```

## Stack Usado

* MongoDB
* Nest