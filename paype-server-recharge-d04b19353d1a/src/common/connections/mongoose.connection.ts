import { Injectable } from '@nestjs/common';
import {
    MongooseModule,
    MongooseModuleOptions,
    MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';


export async function mongoseConnection() {
    return await MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useClass: MongodbConfigService,
    })
}


@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
    constructor(private readonly configService: ConfigService) { }

    public createMongooseOptions(): MongooseModuleOptions {
        const uri = `mongodb://`
            + `${this.configService.get<string>('DATABASE_USER')}:${this.configService.get<string>('DATABASE_PASSWORD')}`
            + `@${this.configService.get<string>('DATABASE_HOST')}:${this.configService.get<string>('DATABASE_PORT')}`
            + `/${this.configService.get<string>('DATABASE_NAME')}`
            + `?authMechanism=DEFAULT&authSource=${this.configService.get<string>('DATABASE_NAME_AUTH')}`

        return {
            uri,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            socketTimeoutMS: 6000000,
            connectTimeoutMS: 6000000,
        };
    }

}