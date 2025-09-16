import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export function swaggerConfig(app: INestApplication) {
	const config = new DocumentBuilder()
        .setTitle(process.env.SWAGGER_TITLE || "Nexus API")
        .setDescription(process.env.SWAGGER_DESC || "API Multifuncional - Nexus")
        .setVersion(process.env.SWAGGER_VERSION || "1.0")
        .addBearerAuth(
            {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
},
'access-token', // This name here is important for matching the @ApiBearerAuth() decorator
    )
        .build();
    const document = SwaggerModule.createDocument(app, config);    
    SwaggerModule.setup('api/docs', app, document);
    
    }