"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = swaggerConfig;
const swagger_1 = require("@nestjs/swagger");
function swaggerConfig(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle(process.env.SWAGGER_TITLE || "Nexus API")
        .setDescription(process.env.SWAGGER_DESC || "API Multifuncional - Nexus")
        .setVersion(process.env.SWAGGER_VERSION || "1.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
}
//# sourceMappingURL=swagger.config.js.map