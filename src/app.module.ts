import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';


@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://fffff:baliq06011991@cluster0.gbiqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`),  
 AuthModule,
 ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
