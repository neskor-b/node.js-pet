import Product from "./product";
import User from "./user";

export const defineAssociations = (): void => {
  Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  User.hasMany(Product);
};

export { Product, User };
