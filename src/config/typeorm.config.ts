import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { Profile } from "src/profile/entity/profile.entitity";
import { Auth } from "src/auth/entity/auth.entity";
import { Fund } from "src/fund/entity/create-fund";
import { Peer } from "src/peer-transfer/entity/peer.entity";
import { Airtime } from "src/airtime/entity/airtime.entity";

export const typeormConfig: TypeOrmModuleAsyncOptions = {
   useFactory: async() => (
    process.env.NODE_ENV === 'production' ? {

    type: 'postgres',

    url: process.env.DATABASE_URL,

    synchronize: true,

    entities: [Auth,Profile,Fund,Peer,Airtime],
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
 