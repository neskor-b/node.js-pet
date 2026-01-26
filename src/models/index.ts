import Product from "./product";
import User from "./user";
import Cart from "./cart";
import CartItem from "./cart-item";

export const defineAssociations = (): void => {
  Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  User.hasMany(Product);
  User.hasOne(Cart);
  Cart.belongsTo(User);
  Cart.belongsToMany(Product, {
    through: CartItem,
  });
  Product.belongsToMany(Cart, {
    through: CartItem,
  });
};

export { Product, User, Cart, CartItem };
