import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { Profile } from "src/profile/entity/profile.entitity";
import { Auth } from "src/auth/entity/auth.entity";
import { Fund } from "src/fund/entity/create-fund";
import { Peer } from "src/peer-transfer/entity/peer.entity";
import { Airtime } from "src/airtime/entity/airtime.entity";
import { Cable } from "src/cable/entity/Cable.entity";
import { postPaidEntity } from "src/electricity/entity/postpaid.entity";
import { prepaidEntity } from "src/electricity/entity/prepaid.entity";
import { smileEntity } from "src/smile/entity/smile.entity";
import { spectranetEntity } from "src/smile/entity/spectranet.entity";
import { dataEntity } from "src/data/Entity/dataEntity";
import { koraid } from "src/profile/entity/koraid.entity";
import { monifyAccountEntity } from "src/profile/entity/monifyAcount.entity";
import { vtData } from "src/airtime/entity/data.entity";
import { waecEntity } from "src/education/entity/waec.entity";
import { vehicleEntitity } from "src/insurance/entity/vehicleInsure.entity";
import { homeEntitity } from "src/insurance/entity/homeInsure.entity";

export const typeormConfig: TypeOrmModuleAsyncOptions = {
   useFactory: async() => (
    process.env.NODE_ENV === 'production' ? {

    type: 'postgres',

    url: process.env.DATABASE_URL,

    synchronize: true,

      entities: [Auth,
        Profile,
        Fund,
        Peer, Airtime,
        Cable,
        postPaidEntity,
        prepaidEntity,
        smileEntity,
        spectranetEntity,
        dataEntity,
        koraid,
        monifyAccountEntity,
        vtData,
        waecEntity,
        vehicleEntitity,
        homeEntitity
      ],
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
 