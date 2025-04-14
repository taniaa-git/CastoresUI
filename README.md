# CastoresUI

Este proyecto es una aplicación web desarrollada con Angular. Funciona como el frontend de un ejercicio práctico y se conecta a una API local mediante autenticación con JWT.

## 🛠️ Configuración del Proyecto

Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) en su versión **19.2.7**.

### 🧑‍💻 IDE Utilizado

- Visual Studio Code

### 💻 Lenguaje y Frameworks

- TypeScript **5.7.2**
- Angular CLI **19.2.7**
- Bootstrap (para el diseño visual)

### 🗄️ Backend / API

- Esta aplicación Angular consume una **API REST** desarrollada por el mismo autor.
- La API se ejecuta localmente en:  
  `http://localhost:8080`
- El repositorio del backend será vinculado aquí próximamente.

### 🔒 Autenticación

- El sistema de autenticación se basa en **JWT**.
- Se utiliza un **interceptor HTTP** en Angular para agregar automáticamente el token en las peticiones a la API.

---

## 🚀 Cómo Ejecutar la Aplicación

Para correr la aplicación de forma local, sigue los siguientes pasos:

```bash
# 1. Instala las dependencias
npm install

# 2. Ejecuta el servidor de desarrollo de Angular
ng serve
