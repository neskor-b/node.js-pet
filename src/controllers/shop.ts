import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import CartItem from "../models/cart-item";
import {
  ProductIdParams,
  AddToCartBody,
  DeleteProductBody,
} from "../types/requests";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.findAll();
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All products",
      path: "/products",
      activeShop: true,
      hasProducts: products.length > 0,
    });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (
  req: Request<ProductIdParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findByPk(prodId);
    if (!product) {
      res.status(404).render("404", {
        pageTitle: "Product Not Found",
        path: "/products",
      });
      return;
    }
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (err) {
    next(err);
  }
};

export const getIndex = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.findAll();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (err) {
    next(err);
  }
};

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cart = await req.user.getCart();
    const cartProducts = await cart.getProducts();
    res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "/cart",
      products: cartProducts,
    });
  } catch (err) {
    next(err);
  }
};

export const postCart = async (
  req: Request<{}, {}, AddToCartBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const prodId = parseInt(req.body.productId);
    const product = await Product.findByPk(prodId);

    if (!product) {
      res.status(404).render("404", {
        pageTitle: "Product Not Found",
        path: "/cart",
      });
      return;
    }

    const cart = await req.user.getCart();
    const cartProducts = await cart.getProducts();
    const existingProduct = cartProducts.find((p) => p.id === prodId);

    if (existingProduct) {
      const cartItem = await CartItem.findOne({
        where: {
          cartId: cart.id,
          productId: prodId,
        },
      });

      if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();
      }
    } else {
      await cart.addProduct(product, { through: { quantity: 1 } });
    }

    res.redirect("/cart");
  } catch (err) {
    next(err);
  }
};

export const postCartDelete = async (
  req: Request<{}, {}, DeleteProductBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const prodId = req.body.id;
    const cart = await req.user.getCart();
    const product = await Product.findByPk(prodId);
    if (product) {
      await cart.removeProduct(product);
    }
    res.redirect("/cart");
  } catch (err) {
    next(err);
  }
};

export const getCheckout = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

export const getOrders = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};
