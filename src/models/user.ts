import {
  DataTypes,
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";
import sequelize from "../util/database";
import Product from "./product";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association mixins - automatically added by Sequelize when associations are defined
  declare getProducts: HasManyGetAssociationsMixin<Product>;
  declare addProduct: HasManyAddAssociationMixin<Product, number>;
  declare createProduct: HasManyCreateAssociationMixin<Product, "userId">;
  declare removeProduct: HasManyRemoveAssociationMixin<Product, number>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default User;
