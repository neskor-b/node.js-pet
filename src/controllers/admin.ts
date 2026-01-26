import { Request, Response, NextFunction } from "express";
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
    const [product] = await req.user.getProducts({
      where: { id: req.params.productId },
    });
    if (!product) {
      res.status(404).render("404", {
        pageTitle: "Product Not Found",
        path: "/admin/products",
      });
      return;
    }
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
    const [product] = await req.user.getProducts({
      where: { id: Number(req.body.id) },
    });

    if (!product) {
      res.status(404).render("404", {
        pageTitle: "Product Not Found",
        path: "/admin/products",
      });
      return;
    }

    await product.destroy();

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
    const [product] = await req.user.getProducts({
      where: { id: req.params.productId },
    });

    if (!product) {
      res.status(404).render("404", {
        pageTitle: "Product Not Found",
        path: "/admin/products",
      });
      return;
    }

    await product.update({
      title: req.body.title,
      price: Number(req.body.price),
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    });

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
    const products = await req.user.getProducts();
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
