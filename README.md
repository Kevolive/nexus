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
- **WhatsApp** → Enviar mensajes vía API Meta.  
- **Auth** → Sistema de autenticación y autorización con JWT.  
- **Common** → Módulo de utilidades compartidas (pipes, interceptores, etc).
 🔹 Tecnologías

Backend: NestJS

ORM:  Prisma 

DB: Postgresql

Autenticación: JWT con Passport

Mensajería: API Meta (WhatsApp Business)

Generación de Facturas: Librerías QR + PDFKit