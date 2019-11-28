import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// App Modules
import { MiddlewareModule } from './middleware/middleware.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ProductsModule } from './modules/products/products.module';

// Entities
import { Product } from '@models/product.entity';

@Module({
  imports: [
  TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'nester',
      entities: [Product],
      synchronize: true,
    }),
    MiddlewareModule,
    DatabaseModule,
    ConfigModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
