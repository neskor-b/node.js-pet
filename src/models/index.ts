import Product from "./product";
import User from "./user";
import Cart from "./cart";
import CartItem from "./cart-item";

export const defineAssociations = (): void => {
  Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "userId",
  });
  User.hasMany(Product, {
    foreignKey: "userId",
  });
  User.hasOne(Cart, {
    foreignKey: "userId",
  });
  Cart.belongsTo(User, {
    foreignKey: "userId",
  });
  Cart.belongsToMany(Product, {
    through: CartItem,
    foreignKey: "cartId",
    otherKey: "productId",
  });
  Product.belongsToMany(Cart, {
    through: CartItem,
    foreignKey: "productId",
    otherKey: "cartId",
  });
};

export { Product, User, Cart, CartItem };
