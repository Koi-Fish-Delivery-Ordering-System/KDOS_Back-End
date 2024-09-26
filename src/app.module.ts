import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { databaseConfig } from "./config/database.config"
import { ConfigModule } from "@nestjs/config"
import { ControllersModule } from "./controllers"
import { GlobalModule } from "./global/global.module"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { join } from "path"
import { ResolversModule } from "./resolvers"


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            load: [databaseConfig],
        }),
        
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), "src/schema.gql"),
            sortSchema: true,
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
            introspection: true
        }),

        TypeOrmModule.forRoot({
            type: "mysql",
            host: databaseConfig().mysql.host,
            port: databaseConfig().mysql.port,
            username: databaseConfig().mysql.username,
            password: databaseConfig().mysql.password,
            database: databaseConfig().mysql.schema,
            autoLoadEntities: true,
            synchronize: true,
            poolSize: 1000000,
            timezone: "Z",
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            driver: require("mysql2"),
            connectorPackage: "mysql2",
        }),

        ControllersModule,
        GlobalModule,
        ResolversModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}


