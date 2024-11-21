import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Items } from './entities/item.entity';


@Injectable()
export class ItemsService {

  constructor(@InjectModel(Items.name) private ItemsModeil : Model<Items>){}


  create(createItemDto: CreateItemDto): Promise<Items> {
    const results = new this.ItemsModeil(createItemDto)
    return results.save()
  }

  findAll(): Promise<Items[]> {
    return this.ItemsModeil.find().exec()
  }

  findOne(id: number): Promise<Items> {
    return  this.ItemsModeil.findById(id).exec()
  }

  update(id: number, updateItemDto: UpdateItemDto): Promise<Items> {
    return this.ItemsModeil.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
  }
  

  remove(id: number):Promise<Items> {
    return this.ItemsModeil.findByIdAndDelete(id).exec()
  }
}
