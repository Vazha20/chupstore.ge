import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(@Query('category') category?: string): Promise<Product[]> {
    return this.productService.findAll(category);
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Product | null> {
  return await this.productService.findOne(id);
}

  @Post()
  create(@Body() data: Partial<Product>): Promise<Product> {
    return this.productService.create(data);
  }
}
