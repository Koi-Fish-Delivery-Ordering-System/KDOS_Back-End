import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { databaseConfig } from "./config/database.config"
import { DataSource } from "typeorm"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

const createDatabase = async () => {
    const master = new DataSource({
        type: "mysql",
        host: databaseConfig().mysql.host,
        port: databaseConfig().mysql.port,
        username: databaseConfig().mysql.username,
        password: databaseConfig().mysql.password,
    })

    const promises: Array<Promise<void>> = []

    promises.push(
        (async () => {
            const dataSource = await master.initialize()
            await dataSource
                .createQueryRunner()
                .createDatabase(databaseConfig().mysql.schema, true)
        })(),
    )

    await Promise.all(promises)
}

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)

    app.enableCors()

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle("Koi Delivery Ordering System")
        .setDescription("APIs")
        .setVersion("1.0")
        .build()
    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup("/", app, document, {
        swaggerOptions: { defaultModelsExpandDepth: -1 },
    })

    await app.listen(process.env.PORT || 3000)
}
createDatabase().then(() => bootstrap())
