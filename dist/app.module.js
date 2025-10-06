"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mail_module_1 = require("./mail/mail.module");
const clientes_controller_1 = require("./clientes/clientes.controller");
const clientes_service_1 = require("./clientes/clientes.service");
const clientes_module_1 = require("./clientes/clientes.module");
const database_module_1 = require("./database/database.module");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const facturas_module_1 = require("./facturas/facturas.module");
const whatsapp_service_1 = require("./whatsapp/whatsapp.service");
const whatsapp_controller_1 = require("./whatsapp/whatsapp.controller");
const whatsapp_module_1 = require("./whatsapp/whatsapp.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
            }),
            mail_module_1.MailModule, clientes_module_1.ClientesModule, database_module_1.DatabaseModule, auth_module_1.AuthModule, facturas_module_1.FacturasModule, whatsapp_module_1.WhatsappModule],
        controllers: [app_controller_1.AppController, clientes_controller_1.ClientesController, auth_controller_1.AuthController, whatsapp_controller_1.WhatsappController],
        providers: [app_service_1.AppService, clientes_service_1.ClientesService, whatsapp_service_1.WhatsappService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map