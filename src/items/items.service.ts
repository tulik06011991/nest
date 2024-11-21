import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Items } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Items.name) private readonly itemsModel: Model<Items>) {}

  // Yangi item yaratish
  async create(createItemDto: CreateItemDto): Promise<Items> {
    const newItem = new this.itemsModel(createItemDto);
    return await newItem.save();
  }

  // Barcha itemlarni olish
  async findAll(): Promise<Items[]> {
    return await this.itemsModel.find().exec();
  }

  // Bir itemni id bo'yicha olish
  async findOne(id: string): Promise<Items> {
    return await this.itemsModel.findById(id).exec();
  }

  // Itemni yangilash
  async update(id: string, updateItemDto: UpdateItemDto): Promise<Items> {
    return await this.itemsModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
  }

  // Itemni o'chirish
  async remove(id: string): Promise<Items> {
    return await this.itemsModel.findByIdAndDelete(id).exec();
  }
}
