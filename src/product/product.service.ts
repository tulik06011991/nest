import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';  // Import to'g'ri entitydan

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  // Yangi mahsulot yaratish
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);  // DTO yordamida yangi mahsulotni yaratish
    return await createdProduct.save();  // Saqlash va natijani qaytarish
  }

  // Barcha mahsulotlarni olish
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();  // Barcha mahsulotlarni olish
  }

  // Bir mahsulotni olish ID orqali
  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();  // ID orqali mahsulotni olish
  }

  // Mahsulotni yangilash
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();  // Yangilangan mahsulotni qaytarish
  }

  // Mahsulotni o'chirish
  async remove(id: string): Promise<any> {
    return this.productModel.findByIdAndDelete(id).exec();  // Mahsulotni o'chirish
  }
}
