import { DataTypes, Model, Optional, INTEGER } from "sequelize";
import sequelize from "../util/database";

interface CartItemAttributes {
  id: number;
  quantity: number;
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
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: INTEGER,
  },
  {
    sequelize,
    modelName: "CartItem",
  }
);

export default CartItem;
