import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // Yangi item yaratish
  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.create(createItemDto);
  }

  // Barcha itemlarni olish
  @Get()
  async findAll() {
    return await this.itemsService.findAll();
  }

  // Bir itemni id bo'yicha olish
  @Get(':id')
  async findOne(@Param('id') id: string) { // id parametri string sifatida olinadi
    return await this.itemsService.findOne(id);
  }

  // Itemni yangilash
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemsService.update(id, updateItemDto);
  }

  // Itemni o'chirish
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.itemsService.remove(id);
  }
}
