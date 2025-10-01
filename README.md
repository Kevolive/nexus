📌 API Multifuncional - nexus

Esta API está pensada como un backend centralizado para múltiples proyectos (gestión de clientes, facturación con QR, integración con WhatsApp, etc.).
El objetivo es que sea modular, escalable y fácil de mantener.


🎈 Arquitectura del proyecto ---
src/
modules/
clientes/ → ✅ CRUD clientes
facturas/ → ⏳ Facturación con QR y PDF
whatsapp/ → ⏳ Integración API Meta WhatsApp
auth/ → ⏳ Usuarios, roles, JWT
common/ → ⏳ Filtros, pipes, interceptores
database/ → ✅ Configuración ORM (Prisma + PostgreSQL)
main.ts

🔹 Módulos principales

 - **Clientes** → CRUD de clientes (**implementado y probado en Postman**).  
- **Facturas** → Generar facturas (QR, PDF, envío).  
- **WhatsApp** → Enviar mensajes con un script de python; automatización con pyautogui.  
- **Auth** → Sistema de autenticación y autorización con JWT.  
- **Common** → Módulo de utilidades compartidas (pipes, interceptores, etc).
 
 
 
 🔹 Tecnologías

Backend: NestJS - Typescript

ORM:  Prisma 

DB: Postgresql

Autenticación: JWT con Passport

Mensajería: API Meta (WhatsApp Business)

Generación de Facturas: Librerías QR + PDFKit

📖 Documentación interactiva

La API cuenta con documentación generada con **Swagger** para probar endpoints de forma sencilla:

- URL: `http://localhost:3000/api/docs`
- Incluye soporte para **JWT Bearer Token** 🔐  
- Desde aquí puedes:
  - Autenticarse con `/auth/login` y obtener un token.
  - Usar el botón **Authorize** para probar endpoints protegidos.
  - Explorar módulos como **Clientes**, **Auth**, **Mail**, etc.


⚓  Estado actual


   ✅ Módulo Clientes implementado y probado.
   ✅ Módulo Auth funcionando con JWT y roles.
   ⏳ Facturación con QR + PDF en desarrollo.
   ⏳ Integración WhatsApp pendiente.