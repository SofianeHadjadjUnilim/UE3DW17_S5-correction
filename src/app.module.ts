import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
      AuthModule,
      UsersModule,
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
        name:'default',
        type: 'mongodb',
        host: process.env.HOST,
        port: 27017,
        database: process.env.MONGO_DATABASE,
        entities: [Users],
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoLoadEntities: true
      })
    ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
