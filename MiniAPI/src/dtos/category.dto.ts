import { Category } from '../entities/Category';

export class CategoryResponseDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: string,
  ) {}

  static create(category: Category): CategoryResponseDto {
    return new CategoryResponseDto(category.id, category.name, category.createdAt);
  }
}

export class CategoryListDto {
  constructor(
    public readonly data: CategoryResponseDto[],
    public readonly total: number,
    public readonly page: number,
    public readonly size: number,
  ) {}

  static create(categories: Category[], page: number, size: number, total: number): CategoryListDto {
    return new CategoryListDto(
      categories.map(CategoryResponseDto.create),
      total,
      page,
      size,
    );
  }
}
