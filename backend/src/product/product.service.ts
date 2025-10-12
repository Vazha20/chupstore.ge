import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  // დაბრუნება Product[] ყოველთვის, find შეიძლება array იყოს
  findAll(category?: string): Promise<Product[]> {
    if (category) {
      return this.productRepo.find({ where: { category } });
    }
    return this.productRepo.find();
  }

  // findOne ახლა შეიძლება იყოს undefined, ამიტომ Promise<Product | null>
  async findOne(id: number): Promise<Product | null> {
    return await this.productRepo.findOne({ where: { id } });
  }

  create(data: Partial<Product>): Promise<Product> {
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }
}
