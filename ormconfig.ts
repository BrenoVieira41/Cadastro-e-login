export = {
  name: 'default',
  type: 'postgres',
  host: process.env.HOST,
  schema: process.env.SCHEMA,
  port: process.env.PORT,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  migrations: [__dirname + '/src/typeorm/migrations/*.{ts, js}'],
  entities: [__dirname + '/src/typeorm/entity/*.{.ts, .js}', __dirname + '/src/typeorm/entity/*.{.ts, .js}'],
  cli: {
    migrationsDir: './src/typeorm/migrations',
  }
}
