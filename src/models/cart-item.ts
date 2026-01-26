import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../util/database";

interface CartItemAttributes {
  id: number;
  quantity: number;
  cartId: number;
  productId: number;
}

export interface CartItemCreationAttributes extends Optional<
  CartItemAttributes,
  "id"
> {}

class CartItem
  extends Model<CartItemAttributes, CartItemCreationAttributes>
  implements CartItemAttributes
{
  public id!: number;
  public quantity!: number;
  public cartId!: number;
  public productId!: number;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "carts",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "CartItem",
  }
);

export default CartItem;
