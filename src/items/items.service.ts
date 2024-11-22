import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './entities/item.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ItemsService {

  constructor(@InjectModel('Item') private readonly ItemModel: Model<Item>){}
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItems = await new this.ItemModel(createItemDto)
    return newItems.save()
  }

  findAll():Promise<Item[]> {
    return this.ItemModel.find().exec()
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.ItemModel.findById(id).exec();
  
    if (!item) {
      // If item is not found, throw a 404 Not Found exception
      throw new NotFoundException('Item not found');
    }
  
    // If item is found, return it with a 200 OK status code
    return item;
  }

  

async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
  // Correct usage of findByIdAndUpdate
  const item = await this.ItemModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();

  if (!item) {
    throw new NotFoundException('Malumot topilmadi');  // Throw 404 if item not found
  }

  return item;  // Return the updated item
}


  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
