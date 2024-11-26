import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './entities/product.entity';  // Import Product model va schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),  // Product modelini register qilish
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
