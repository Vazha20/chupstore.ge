import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  findAll(category?: string): Promise<Product[]> {
    if (category && category !== "ყველა") {
      return this.repo.find({ where: { category } });
    }
    return this.repo.find();
  }

  findOne(id: number): Promise<Product | null> {
    return this.repo.findOne({ where: { id } });
  }

  create(data: Partial<Product>): Promise<Product> {
    const product = this.repo.create(data);
    return this.repo.save(product);
  }

  async update(id: number, data: Partial<Product>): Promise<Product | null> {
    const product = await this.findOne(id);
    if (!product) return null;
    Object.assign(product, data);
    return this.repo.save(product);
  }

  async remove(id: number): Promise<boolean> {
    const product = await this.findOne(id);
    if (!product) return false;
    await this.repo.remove(product);
    return true;
  }
}
