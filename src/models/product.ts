import {
  DataTypes,
  Model,
  Optional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from "sequelize";
import sequelize from "../util/database";
import User from "./user";

export interface ProductAttributes {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  userId: number;
}

export interface ProductCreationAttributes extends Optional<
  ProductAttributes,
  "id"
> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public title!: string;
  public price!: number;
  public imageUrl!: string;
  public description!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association mixins - automatically added by Sequelize when associations are defined
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "product",
  }
);

export default Product;
