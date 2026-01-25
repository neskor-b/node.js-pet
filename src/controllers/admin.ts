import { Request, Response, NextFunction } from "express";
import { Product } from "../models";
import {
  ProductBody,
  ProductIdParams,
  DeleteProductBody,
} from "../types/requests";

export const getAddProduct = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    product: null,
  });
};

export const postAddProduct = async (
  req: Request<{}, {}, ProductBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).send("User not found");
      return undefined;
    }
    await req.user.createProduct({
      title: req.body.title,
      price: Number(req.body.price),
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getEditProduct = async (
  req: Request<ProductIdParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const prodId = req.params.productId;
    const product = await Product.findByPk(prodId);
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      product: product,
    });
  } catch (err) {
    next(err);
  }
};

export const postDeleteProduct = async (
  req: Request<{}, {}, DeleteProductBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const prodId = req.body.id;
    await Product.destroy({ where: { id: prodId } });
    res.redirect("/admin/products");
  } catch (err) {
    next(err);
  }
};

export const postEditProduct = async (
  req: Request<ProductIdParams, {}, ProductBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const prodId = req.params.productId;
    await Product.update(
      {
        title: req.body.title,
        price: Number(req.body.price),
        imageUrl: req.body.imageUrl,
        description: req.body.description,
      },
      { where: { id: prodId } }
    );
    res.redirect("/admin/products");
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.findAll();
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin products",
      path: "/admin/products",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
