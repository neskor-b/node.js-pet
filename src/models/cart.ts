import {
  DataTypes,
  Model,
  Optional,
  type BelongsToManyGetAssociationsMixin,
  type BelongsToManyAddAssociationMixin,
  type BelongsToManyRemoveAssociationMixin,
} from "sequelize";
import sequelize from "../util/database";
import Product, { ProductAttributes } from "./product";

interface CartAttributes {
  id: number;
}

export interface CartCreationAttributes extends Optional<
  CartAttributes,
  "id"
> {}

class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id!: number;
  public getProducts!: BelongsToManyGetAssociationsMixin<Product>;
  public addProduct!: BelongsToManyAddAssociationMixin<Product, "productId">;
  public removeProduct!: BelongsToManyRemoveAssociationMixin<
    Product,
    "productId"
  >;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "cart",
  }
);

export default Cart;
