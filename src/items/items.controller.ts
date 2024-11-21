import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('items') // API hujjatlarini yaratishda yordam beradi
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // Yangi item yaratish
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'Item has been successfully created.' })
  async create(@Body() createItemDto: CreateItemDto): Promise<Items> {
    try {
      return await this.itemsService.create(createItemDto);
    } catch (error) {
      // Xatolikni qayta ishlash va foydalanuvchiga ma'lumot berish
      throw new Error(`Error creating item: ${error.message}`);
    }
  }

  // Barcha itemlarni olish
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Fetched all items.' })
  async findAll(): Promise<Items[]> {
    try {
      return await this.itemsService.findAll();
    } catch (error) {
      throw new Error(`Error fetching items: ${error.message}`);
    }
  }

  // Bir itemni id bo'yicha olish
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Fetched the item successfully.' })
  async findOne(@Param('id') id: string): Promise<Items> {
    try {
      return await this.itemsService.findOne(id);
    } catch (error) {
      throw new Error(`Item with id ${id} not found: ${error.message}`);
    }
  }

  // Itemni yangilash
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Item has been successfully updated.' })
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Promise<Items> {
    try {
      return await this.itemsService.update(id, updateItemDto);
    } catch (error) {
      throw new Error(`Error updating item with id ${id}: ${error.message}`);
    }
  }

  // Itemni o'chirish
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Item has been successfully deleted.' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.itemsService.remove(id);
    } catch (error) {
      throw new Error(`Error deleting item with id ${id}: ${error.message}`);
    }
  }
}
