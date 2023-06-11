import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto, UpdateCategoryParams } from './dto/update-category.dto';


@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.categoryService.findOneById(id);
  }

  @Post('fields')
  findAllByFields(@Body() category: UpdateCategoryDto) {
    return this.categoryService.findAllByFields(category);
  }

  @Patch('/:user_id/:cate_id')
  update(@Param() params: UpdateCategoryParams, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(params, updateCategoryDto);
  }

  @Delete('/:user_id/:cate_id')
  remove(@Param() params: UpdateCategoryParams) {
    const body = {
      "is_active": false,
      "is_deleted": true
    }
    return this.categoryService.update(params, body, 'string');
  }
}
