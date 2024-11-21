import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Items } from './entities/item.entity';


@Injectable()
export class ItemsService {

constructor(@InjectModel(Items.name) private ItemsModel: Model<Items> ){}

  create(createItemDto: CreateItemDto): Promise<Items> {
    const results =   new this.ItemsModel(createItemDto);
    return results.save()

  }

  findAll(): Promise<Items[]> {
    return  this.ItemsModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
