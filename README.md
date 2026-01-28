# 🏥 Farmacia Online - Quetsana Payphone

[![Angular](https://img.shields.io/badge/Angular-18+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![CI/CD](https://img.shields.io/badge/CI/CD-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)

Aplicación web robusta para la gestión de farmacias, destacando por su integración nativa con la pasarela de pagos **Payphone** y un flujo de despliegue automatizado.

## 🚀 Despliegue en Vivo
El sistema se encuentra operativo y puede ser accedido en la siguiente URL:
👉 [http://quetsana.me/login](http://quetsana.me/login)

---

## 🛠️ Tecnologías Utilizadas

| Componente | Tecnología |
| :--- | :--- |
| **Frontend** | Angular 18+ |
| **Contenedores** | Docker & Docker Compose |
| **Servidor Web** | Nginx (Proxy Inverso) |
| **CI/CD** | GitHub Actions |
| **S.O. Servidor** | Debian 12 (VPS Contabo) |

---

## 📦 Estructura de Despliegue

Para garantizar la eficiencia, el proyecto implementa un **Dockerfile Multi-stage**:

1.  **Etapa de Compilación (Build):** Utiliza `Node.js 22` para generar los archivos de producción de Angular, optimizando el tamaño final.
2.  **Etapa de Servicio (Serve):** Emplea una imagen estable de `Nginx` para servir el contenido estático y actuar como proxy para las peticiones a la API de Payphone.

---

## ⚙️ Configuración del Pipeline (CI/CD)

El flujo de despliegue se automatiza mediante **GitHub Actions** al realizar un `push` a la rama `main`:

1.  **Conexión Segura:** Acceso al servidor VPS mediante protocolo SSH (Llaves Ed25519).
2.  **Limpieza:** Ejecución de `docker compose down` y `docker image prune` para liberar espacio y eliminar imágenes huérfanas.
3.  **Reconstrucción:** Ejecución de `docker compose up --build -d` para desplegar la última versión.
4.  **Health Check:** Verificación automática de la salud del contenedor para asegurar que el servicio esté arriba.

---

## 🔑 Credenciales de Prueba (Demo)

Para explorar las funcionalidades administrativas, utiliza los siguientes accesos:

* **Usuario:** `admin@farmacia.com`
* **Contraseña:** `admin123`

- nota: crear un usuario para ver las funciones de pasarela de pago y catalogo de productos.

---
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.






