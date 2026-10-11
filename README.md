Secure Auth App

Aplicación web desarrollada con Next.js y Supabase Auth para implementar
autenticación segura, protección de rutas, recuperación de contraseña y
medidas de seguridad a nivel de servidor.

Descripción

Este proyecto implementa un flujo completo de autenticación para una
aplicación web profesional utilizando:

Next.js 16 con App Router

TypeScript

Supabase Auth

@supabase/ssr

Server Actions

Next.js Proxy

Cookies de sesión protegidas

Validación de solicitudes en el servidor

Headers de seguridad

Content Security Policy (CSP)

El objetivo principal es demostrar la implementación de capas de
seguridad a nivel de servidor y buenas prácticas para una aplicación web
profesional.

Funcionalidades

Registro de usuarios

Inicio de sesión

Cierre de sesión

Dashboard protegido

Recuperación de contraseña

Cambio de contraseña

Verificación de correo mediante el flujo de Supabase

Protección de rutas mediante Next.js Proxy

Validación de datos en el servidor

Validación de origen de las solicitudes

Manejo de sesiones mediante cookies

Protección contra acceso directo a rutas protegidas

Tecnologías utilizadas

Tecnología        Uso

Next.js 16        Framework web y App Router
React             Interfaz de usuario
TypeScript        Tipado estático
Supabase          Autenticación y gestión de usuarios
@supabase/ssr   Integración de Supabase con SSR
Tailwind CSS      Estilos de la aplicación

Requisitos

Antes de ejecutar el proyecto se necesita:

Node.js

npm

Una cuenta de Supabase

Un proyecto creado en Supabase

Instalación

Clona el repositorio:

git clone <URL_DEL_REPOSITORIO>

Entra al proyecto:

cd secure-auth-app

Instala las dependencias:

npm install

Variables de entorno

Crea un archivo .env.local en la raíz del proyecto:

NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu_publishable_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

No se deben publicar las variables de entorno privadas ni subir
.env.local al repositorio.

Configuración de Supabase

Para desarrollo local, la aplicación utiliza:

http://localhost:3000

El flujo de recuperación de contraseña utiliza:

/auth/callback?next=/reset-password

Para producción, NEXT_PUBLIC_SITE_URL debe apuntar al dominio real y
las URLs de redirección correspondientes deben estar configuradas en
Supabase.

Estructura principal

secure-auth-app/
├── app/
│   ├── actions/
│   │   └── auth.ts
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── forgot-password/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── reset-password/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ForgotPasswordForm.tsx
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── ResetPasswordForm.tsx
├── lib/
│   ├── security.ts
│   └── supabase/
│       ├── client.ts
│       ├── proxy.ts
│       └── server.ts
├── proxy.ts
├── next.config.ts
├── package.json
└── README.md

Arquitectura de autenticación

Cliente de servidor

lib/supabase/server.ts utiliza createServerClient para trabajar con
Supabase desde Server Components, Route Handlers y Server Actions.

Proxy

lib/supabase/proxy.ts actualiza la sesión y mantiene sincronizadas las
cookies entre la solicitud y la respuesta.

El archivo raíz proxy.ts ejecuta esta lógica para las solicitudes que
pasan por el matcher configurado.

Server Actions

app/actions/auth.ts contiene:

signUp

signIn

signOut

requestPasswordReset

updatePassword

Estas acciones se ejecutan en el servidor y realizan validaciones antes
de comunicarse con Supabase.

Seguridad implementada

Cookies de sesión

Las cookies utilizadas para la sesión se configuran con:

HttpOnly
SameSite=Lax
Secure en producción

HttpOnly evita que JavaScript del navegador pueda leer directamente la
cookie de sesión.

Durante las pruebas en desarrollo se verificó que la cookie aparece con
HttpOnly habilitado y que no se almacenan tokens de Supabase en Local
Storage.

Protección de rutas

La ruta /dashboard requiere una sesión válida.

Si un usuario no autenticado intenta acceder, el Proxy lo redirige a
/login.

Los usuarios autenticados que intentan acceder a /login o /register
son redirigidos al dashboard.

Validación de origen

lib/security.ts valida el origen de las solicitudes realizadas por las
Server Actions.

La validación comprueba:

Presencia del header Origin

Presencia del header Host

Coincidencia entre el origen y el host

HTTPS en producción

HTTP permitido únicamente para desarrollo local

Validación de datos

Las Server Actions validan los datos antes de procesarlos.

El correo electrónico debe tener un formato válido y las contraseñas
deben contener al menos 8 caracteres.

En el cambio de contraseña también se comprueba que ambas contraseñas
coincidan.

Protección contra enumeración de usuarios

El flujo de recuperación de contraseña utiliza un mensaje genérico para
no revelar directamente si una dirección de correo electrónico está
registrada.

Headers de seguridad

La aplicación configura:

X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy

La Content Security Policy establece restricciones para scripts,
estilos, imágenes, fuentes, conexiones, frames y formularios.

Recuperación de contraseña

El flujo funciona de la siguiente manera:

Usuario
   |
   v
/forgot-password
   |
   v
Supabase Auth
   |
   v
Correo de recuperación
   |
   v
/auth/callback
   |
   v
Intercambio del código por sesión
   |
   v
/reset-password
   |
   v
Nueva contraseña

El callback valida el parámetro de redirección para evitar redirecciones
externas no autorizadas.

Ejecución en desarrollo

npm run dev

La aplicación estará disponible en:

http://localhost:3000

Verificación del proyecto

Para comprobar que el proyecto compila correctamente:

npm run build

El proyecto fue verificado mediante un build de producción exitoso.

También se verificaron manualmente:

Inicio de sesión

Persistencia de sesión al recargar

Protección del dashboard

Cierre de sesión

Recuperación de contraseña

Cambio de contraseña

Cookies HttpOnly

Ausencia de tokens en Local Storage

Headers de seguridad

Producción

Antes de desplegar la aplicación se debe:

Configurar las variables de entorno en el proveedor de hosting.

Cambiar NEXT_PUBLIC_SITE_URL al dominio de producción.

Configurar las URLs de redirección correspondientes en Supabase.

Verificar que el dominio utilice HTTPS.

Ejecutar un build de producción.

Probar nuevamente login, logout, recuperación de contraseña y acceso
al dashboard.

Comandos principales

npm install
npm run dev
npm run build
npm run start

Estado del proyecto

El flujo principal de autenticación y las medidas principales de
seguridad han sido implementados y verificados en el entorno local.

Pendiente para la entrega final:

Configuración definitiva del dominio de producción

Deployment

Configuración de URLs de producción en Supabase

Publicación del repositorio en GitHub 