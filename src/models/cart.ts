import fs from 'fs';
import { CART_PATH } from './constants';

interface CartProduct {
  id: string;
  quantity: number;
}

interface CartData {
  products: CartProduct[];
  totalPrice: number;
}

export default class Cart {
  static async addProduct(id: string, productPrice: number): Promise<void> {
    let cart: CartData = { products: [], totalPrice: 0 };

    try {
      const fileContent = await fs.promises.readFile(CART_PATH, 'utf-8');
      cart = JSON.parse(fileContent);
    } catch (err) {
      console.log(err);
    }

    const existingProductIndex = cart.products.findIndex(
      (prod) => prod.id === id
    );
    const existingProduct = cart.products[existingProductIndex];
    let updatedProduct: CartProduct;

    if (existingProduct) {
      updatedProduct = {
        ...existingProduct,
        quantity: existingProduct.quantity + 1,
      };
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      updatedProduct = { id: id, quantity: 1 };
      cart.products = [...cart.products, updatedProduct];
    }

    cart.totalPrice += Number(productPrice);
    await fs.promises.writeFile(CART_PATH, JSON.stringify(cart));
  }

  static async deleteProduct(id: string, productPrice: number): Promise<void> {
    try {
      const fileContent = await fs.promises.readFile(CART_PATH, 'utf-8');
      const cart: CartData = JSON.parse(fileContent);
      const product = cart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.quantity;
      cart.products = cart.products.filter((prod) => prod.id !== id);
      cart.totalPrice -= productPrice * productQty;
      await fs.promises.writeFile(CART_PATH, JSON.stringify(cart));
    } catch (err) {
      console.log(err);
    }
  }

  static async getCart(): Promise<CartData | null> {
    try {
      const fileContent = await fs.promises.readFile(CART_PATH, 'utf-8');
      const cart: CartData = JSON.parse(fileContent);
      return cart;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
