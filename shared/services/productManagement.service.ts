import type { IProduct } from '~/shared/models/product.model';

export class ProductManagementService {
  static getAllProducts(): Array<IProduct> {
    return JSON.parse(localStorage.getItem('products') as string) || [];
  }

  static createProduct(item: IProduct) {
    let allProducts = ProductManagementService.getAllProducts();
    allProducts.push(item);
    localStorage.setItem('products', JSON.stringify(allProducts));
  }

  static editProduct(item: IProduct) {
    let allProducts = ProductManagementService.getAllProducts();
    const foundProduct = allProducts?.find((product) => product.id === item.id);

    if (!foundProduct) {
      return;
    }

    foundProduct.title = item.title;
    foundProduct.price = item.price;
    foundProduct.color = item.color;
    foundProduct.width = item.width;
    foundProduct.manufactorer = item.manufactorer;
    foundProduct.material = item.material;
    foundProduct.height = item.height;
    foundProduct.description = item.description;

    localStorage.setItem('products', JSON.stringify(allProducts));
  }
}
