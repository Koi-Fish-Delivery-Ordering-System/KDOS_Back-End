export const databaseConfig = () =>
    ({
        mysql: {
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            schema: process.env.MYSQL_SCHEMA,
            host: process.env.MYSQL_HOST,
            port: Number.parseInt(process.env.MYSQL_PORT),
        }
    })