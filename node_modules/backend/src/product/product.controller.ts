import { Controller, Get, Post, Body, Param, Query, Delete, Put, NotFoundException, ParseIntPipe } from '@nestjs/common';
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
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Product | null> {
    return await this.productService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Product>): Promise<Product> {
    return this.productService.create(data);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Product>): Promise<Product> {
    const product = await this.productService.update(id, data);
    if (!product) throw new NotFoundException('პროდუქტი ვერ მოიძებნა');
    return product;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    const deleted = await this.productService.remove(id);
    if (!deleted) throw new NotFoundException('პროდუქტი ვერ მოიძებნა');
    return { message: 'პროდუქტი წაიშალა' };
  }
}
