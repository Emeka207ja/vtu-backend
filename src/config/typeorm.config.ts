import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";


export const typeormConfig: TypeOrmModuleAsyncOptions = {
   useFactory: async() => (
    process.env.NODE_ENV === 'production' ? {

    type: 'postgres',

    url: process.env.DATABASE_URL,

    synchronize: true,

    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // entities: [AuthEntity,taskEntity],

}

:

{

  type: 'postgres',

  host: "localhost",

  port: 5432,

  username: 'postgres',

  password: "imprint",

  database:  "vtu",

  synchronize: true,

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  extra: {
      charset: 'utf8mb4_unicode_ci',
    },
    cache: true,
    logger: 'advanced-console',
    logging: process.env.NODE_ENV === 'development',
    autoLoadEntities: true,

}
)
}
 