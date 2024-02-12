### Proyecto de Practica de un Chat en Tiempo Real.

## Tecnologias utilizadas:

- React
- Node JS
- JWT Token + Refresh Token
- Zod
- Express
- Socket.IO
- Mongo DB


## Explicacion del proyecto

El proyecto consiste en un chat en tiempo real.
La aplicacion cuenta con un sistema de registro simple y de login a traves de un token JWT. La informacion se guarda en una base de datos no relacional en Mongo DB.
El chat se actualiza en tiempo real en todas las pantallas en simultaneo.
Cuenta con errores controlados por Zod, y tambien un sistema de refresco de token si el usuario sigue dentro de la web. Caso contrario, el token vence y debe loguearse nuevamente.
Se utilizaron diferentes tecnicas y librerias:
- Tailwind CSS para estilos
- SweetAlert para los mensajes de alerta
- React Context para manejar el token de forma global en la aplicacion
- Hooks de React y Custom Hooks propios.
- React Router para el manejo de rutas
- Fetch para el manejo asincronico de los datos solicitados a la DB
- Zod para el manejo personalizado de errores
- Local Storage para el guardado del token de identificacion




