import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './entities/item.entity'; // Import both the model and schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]) // Corrected here
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
