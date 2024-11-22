import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://fffff:baliq06011991@cluster0.gbiqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`), ItemsModule,
   ItemsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
