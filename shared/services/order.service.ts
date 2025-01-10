import type { IProduct } from '#shared/models/product.model';

export class OrderService {
  public static getCart(): Array<IProduct> {
    return JSON.parse(localStorage.getItem('cart') || '[]') ;
  }

  public static getOrders(): Array<IProduct> {
    return JSON.parse(localStorage.getItem('orders') || '[]') ;
  }

  public static addItemToCart(item: IProduct) {
    const cart: Array<IProduct> = OrderService.getCart() || [];
    const foundProduct = cart.find((product: IProduct) => product.id === item.id);

    if (foundProduct) {
      foundProduct.cartCount = (foundProduct.cartCount || 0) + 1;
    }
    else {
      cart.push({
        ...item,
        cartCount: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart))
  }

  public static changeCount(id: number, newCount: number): void {
    const cart: Array<IProduct> = OrderService.getCart() || [];
    const foundProduct = cart.find((product: IProduct) => product.id === id);

    if (newCount === 0) {
      localStorage.setItem('cart', JSON.stringify(cart.filter((item) => item.id !== id)));
      return;
    }

    if (foundProduct) {
      foundProduct.cartCount = newCount;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  public static placeOrder(cart: Array<IProduct>, address: string): void {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({
      created: (new Date()).toDateString(),
      address,
      cart: cart?.filter((item) => !!item.cartCount),
    });
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('cart', JSON.stringify([]));
  }
}
