import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from './controllers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [databaseConfig],
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
      driver: require("mysql2"),
      connectorPackage: "mysql2",
    }),

    ControllersModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
