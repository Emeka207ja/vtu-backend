import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { Profile } from "src/profile/entity/profile.entitity";
import { Auth } from "src/auth/entity/auth.entity";
import { Fund } from "src/fund/entity/create-fund";
import { Peer } from "src/peer-transfer/entity/peer.entity";
import { Airtime } from "src/airtime/entity/airtime.entity";
import { Cable } from "src/cable/entity/Cable.entity";
import { Electric } from "src/electricity/entity/electric.entity";
import { prepaidEntity } from "src/electricity/entity/prepaidElectric";
import { smileEntity } from "src/smile/entity/smileEntity";
import { spectranetEntity } from "src/smile/entity/spectranetEntity";
import { dataEntity } from "src/data/Entity/dataEntity";

export const typeormConfig: TypeOrmModuleAsyncOptions = {
   useFactory: async() => (
    process.env.NODE_ENV === 'production' ? {

    type: 'postgres',

    url: process.env.DATABASE_URL,

    synchronize: true,

    entities: [Auth,Profile,Fund,Peer,Airtime,Cable,Electric,prepaidEntity,smileEntity,spectranetEntity,dataEntity],
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
 