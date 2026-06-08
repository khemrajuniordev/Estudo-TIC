import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { AppError } from '../errors/AppError';

export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  getAll(page: number, size: number): { data: Product[]; total: number } {
    return this.productRepository.getAllProducts(page, size);
  }

  getById(id: string): Product {
    const product = this.productRepository.getProductById(id);
    if (!product) throw new AppError('Produto não encontrado.', 404);
    return product;
  }

  create(name: string, price: number, stock: number, categoryId: string): Product {
    const categoryExists = this.categoryRepository.getCategoryById(categoryId);
    if (!categoryExists) throw new AppError('Categoria informada não existe.', 404);

    const product = Product.create(name, price, stock, categoryId);
    return this.productRepository.createProduct(product);
  }

  update(id: string, name?: string, price?: number, stock?: number, categoryId?: string): Product {
    const product = this.productRepository.getProductById(id);
    if (!product) throw new AppError('Produto não encontrado.', 404);

    if (categoryId && categoryId !== product.categoryId) {
      const categoryExists = this.categoryRepository.getCategoryById(categoryId);
      if (!categoryExists) throw new AppError('Nova categoria informada não existe.', 404);
    }

    product.update(name, price, stock);
    return this.productRepository.updateProduct(product);
  }

  delete(id: string): void {
    const product = this.productRepository.getProductById(id);
    if (!product) throw new AppError('Produto não encontrado.', 404);
    this.productRepository.deleteProduct(id);
  }
}
