import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      const newItem = new this.itemsModel(createItemDto);
      return await newItem.save();
    } catch (error) {
      throw new Error(`Error creating item: ${error.message}`);
    }
  }

  // Barcha itemlarni olish
  async findAll(): Promise<Items[]> {
    try {
      return await this.itemsModel.find().exec();
    } catch (error) {
      throw new Error(`Error fetching items: ${error.message}`);
    }
  }

  // Bir itemni id bo'yicha olish
  async findOne(id: string): Promise<Items> {
    try {
      const item = await this.itemsModel.findById(id).exec();
      if (!item) {
        throw new NotFoundException(`Item with id ${id} not found`);
      }
      return item;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException(`Item with id ${id} not found`);
      }
      throw new Error(`Error fetching item with id ${id}: ${error.message}`);
    }
  }

  // Itemni yangilash
  async update(id: string, updateItemDto: UpdateItemDto): Promise<Items> {
    try {
      const updatedItem = await this.itemsModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
      if (!updatedItem) {
        throw new NotFoundException(`Item with id ${id} not found`);
      }
      return updatedItem;
    } catch (error) {
      throw new Error(`Error updating item with id ${id}: ${error.message}`);
    }
  }

  // Itemni o'chirish
  async remove(id: string): Promise<Items> {
    try {
      const deletedItem = await this.itemsModel.findByIdAndDelete(id).exec();
      if (!deletedItem) {
        throw new NotFoundException(`Item with id ${id} not found`);
      }
      return deletedItem;
    } catch (error) {
      throw new Error(`Error deleting item with id ${id}: ${error.message}`);
    }
  }
}
