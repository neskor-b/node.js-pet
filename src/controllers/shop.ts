import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import Cart from "../models/cart";
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
    const cart = await Cart.getCart();
    const products = await Product.findAll();
    const cartProducts = cart?.products?.map((cartProduct) => {
      const product = products.find((p) => p.id.toString() === cartProduct.id);
      return { ...product?.dataValues, quantity: cartProduct.quantity };
    });

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
    const prodId = req.body.productId;
    const product = await Product.findByPk(prodId);
    if (product) {
      await Cart.addProduct(prodId, product.price);
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
    const product = await Product.findByPk(prodId);
    if (product) {
      await Cart.deleteProduct(prodId, product.price);
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
