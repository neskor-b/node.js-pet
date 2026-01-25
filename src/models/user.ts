import {
  DataTypes,
  Model,
  Optional,
  type HasManyGetAssociationsMixin,
  type HasManyCreateAssociationMixin,
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

  // Association methods
  public getProducts!: HasManyGetAssociationsMixin<Product>;
  public createProduct!: HasManyCreateAssociationMixin<Product, "userId">;
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
